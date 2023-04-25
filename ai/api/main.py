from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
#---
import os
import io
import torch
import torchvision.transforms as transforms
from fastapi import FastAPI, HTTPException
from PIL import Image
#---
# detection
from detection import yolo


# GPU가 사용 가능한 경우 cuda를 0으로 초기화하여 사용 / GPU가 사용 불가능한 경우 CPU로 초기화하여 CPU 사용
device = torch.device("cuda" if torch.cuda.is_available() else "cpu") 
# FastAPI 설정
app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    print(item)
    return {"item_name": item.name, "item_id": item_id}


## Backend로부터 받은 휠 분석 요청 처리 ##
@app.get("/api/analyze/{image_path}")
def analyze_wheel(image_path:str):
    # cropped 된 볼트의 각 bounding box 좌표를 원소로하는 리스트를 받는다.
    bboxes = yolo.detect_bolt(image_path)
    response = {
        'bboxes': bboxes,
        'message': 'success'
    }
    return response

# 볼트 분석 모델 load
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CLASSIFICATION_MODEL_DIR = os.path.join(os.path.join(BASE_DIR, "models"), "classification_model.pth")
classification_model = torch.load(CLASSIFICATION_MODEL_DIR, map_location=torch.device("cuda" if torch.cuda.is_available() else "cpu"))
classification_model.eval()
class_names = ['breaking','disappearance','good']

# 분류를 위한 볼트 이미지 파일 전처리
transformations = transforms.Compose([
    # 해상도를 (224,224)로 맞춰준다
    transforms.Resize((224, 224)),
    # 이미지를 PyTorch의 Tensor로 변환
    transforms.ToTensor(),
    # 흑백 이미지이기 때문에 1개의 채널을 정규화
    transforms.Normalize([0.5], [0.5])
])

# 볼트 이미지를 읽어 결과를 반환하는 함수
def classification(image):
    # 이미지를 전처리(unsqueeze를 이용해 배치 차원을 추가하고, GPU를 사용)
    image = transformations(image).unsqueeze(0).to(device)

    # 모델의 파라미터가 업데이트 되지 않고 연산의 중복을 막아 빠른 결과를 출력
    with torch.no_grad():
        # classification_model image를 넣어 예측
        outputs = classification_model(image)
        # torch.max 함수를 이용해 출력값 중 가장 큰 값을 가지는 인덱스
        _, preds = torch.max(outputs, 1)
    # 예측한 결과 preds에서 가장 확률이 높은 클래스를 class_names 리스트에서 찾아 반환
    return class_names[preds[0]]


# infer로 get 요청이 왔을 때
@app.get("/infer")
# 휠 이미지 디텍션 후 볼트 분류 함수 실행(쿼리에 담긴 filePath 전달)
def detect_classification(filePath: str):
    
    ## 이미지 크롭 코드 ##
    image, bboxes = yolo.detect_bolt(filePath)
    now_bbox = bboxes[0]
    x_min = now_bbox[0]
    y_min = now_bbox[1]
    x_max = now_bbox[2]
    y_max = now_bbox[3]
    cropped = image.crop((x_min, y_min, x_max, y_max))
    
    # cropped 이미지를 분류 모델에 넣으면 됨!
    # 만약 오류날 경우 아래 코드 실행해서 cropped 이미지 다시 불러와서 사용하면 됨
    # from io import BytesIO
    # b = BytesIO()
    # cropped.save(b, format='jpeg')
    # cropped = Image.open(b)
    
    try:
        # filePath의 앞부분을 IMG_DIR에 저장
        IMG_DIR = os.path.dirname('../../semes_bolt/')
        # image에 해당 휠 이미지 열기
        image = Image.open(os.path.join(IMG_DIR, filePath))
        # image를 RGB로 변환
        image = image.convert('RGB')
        # 볼트 분류 결과를 class_name에 저장
        class_name = classification(image)
        print(class_name)
        
        # 데이터를 JSON 형식으로 구성
        data = {
            "markedImage": "WHEEL_RESULT/marked.png",
            "bolts": [],
            "word": "저장중"
        }
        
        # 성공적으로 분류 작업을 수행한 경우
        return {
            "status": 200,
            "success": True,
            "data": data
        }
    except FileNotFoundError:
        # 파일 경로가 잘못된 경우
        raise HTTPException(status_code=400, detail="필요한 값이 없습니다.")
    except Exception as e:
        # 분류 작업 중 오류가 발생한 경우
        raise HTTPException(status_code=500, detail="서버 내 오류")
