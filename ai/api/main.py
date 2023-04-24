from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
#---
import os
import io
import torch
import torchvision.transforms as transforms
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image

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
def get_prediction(image):
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


@app.get("/infer")
def detect_classification(filePath: str):
    print(filePath)
    image = Image.open(filePath)
    image = image.convert('RGB')
    class_name = get_prediction(image)
    print(class_name)
    return class_name