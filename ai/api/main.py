from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import re
import torch
from fastapi import FastAPI, HTTPException
import time

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

# infer로 들어온 query의 파일 형식이 이미지 파일인지 확인
REGEX = re.compile('.jpg|.png|.jpeg|.gif|.bmp|.JPG|.PNG|.JPEG|.GIF|.BMP')
# infer로 get 요청이 왔을 때
@app.get("/infer")
# 휠 이미지 디텍션 후 볼트 분류 함수 실행(쿼리에 담긴 filePath 전달)
def detect_classification(filePath: str):
    try:
        # 추론 시작 시간 설정
        start_test = time.time()
        # cropped 된 볼트의 각 bounding box 좌표를 원소로하는 리스트를 받는다.
        image, bboxes = yolo.detect_bolt(filePath)
        # 확장자 삭제
        filePath = re.sub(REGEX, '', filePath)
        # 이미지 크롭 후 분류하여 이미지 저장 및 분류 결과 텍스트로 저장
        result = RegNet.ImgCrop(filePath, image, bboxes)
        # 추론 종료 시간 저장
        reasoning_time = round(time.time() - start_test, 3)

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
            "reasoning_time" : reasoning_time,
            "data": data
        }
    except FileNotFoundError:
        # 파일 경로가 잘못된 경우
        raise HTTPException(status_code=400, detail="필요한 값이 없습니다.")
    except Exception as e:
        # 분류 작업 중 오류가 발생한 경우
        raise HTTPException(status_code=500, detail="서버 내 오류")
