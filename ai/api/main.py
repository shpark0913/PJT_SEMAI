from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import os
import torch
from fastapi import FastAPI, HTTPException
# detection
from detection import yolo
# clssification
from classification import RegNet

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
    return {"Hello": "SEMES"}

# infer로 get 요청이 왔을 때
@app.get("/infer")
# 휠 이미지 디텍션 후 볼트 분류 함수 실행(쿼리에 담긴 filePath 전달)
def detect_classification(filePath: str):
    
    # cropped 이미지를 분류 모델에 넣으면 됨!
    # 만약 오류날 경우 아래 코드 실행해서 cropped 이미지 다시 불러와서 사용하면 됨
    # from io import BytesIO
    # b = BytesIO()
    # cropped.save(b, format='jpeg')
    # cropped = Image.open(b)
    
    try:
        # cropped 된 볼트의 각 bounding box 좌표를 원소로하는 리스트를 받는다.
        bboxes = yolo.detect_bolt(filePath)
 
        # 이미지 크롭 코드 ##
        image, bboxes = yolo.detect_bolt(filePath)
        now_bbox = bboxes[0]
        x_min = now_bbox[0]
        y_min = now_bbox[1]
        x_max = now_bbox[2]
        y_max = now_bbox[3]
        cropped = image.crop((x_min, y_min, x_max, y_max))
        print(bboxes)
        result = []
        A = RegNet.classification(cropped)
        print(A)
        result.append(A)
        # 데이터를 JSON 형식으로 구성
        data = {
            "markedImage": "WHEEL_RESULT/marked.png",
            "bolts": result,
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
