import re
import os
import sys
import time
import torch
import pandas as pd
from typing import Union
from detection import yolo
from fastapi import FastAPI
from pydantic import BaseModel
from anomaly.isolation_forest import check_anomaly
from fastapi import FastAPI, HTTPException
from classification import RegNet, Transfer
from predict import LinearRegression

NOW_DIR = os.getcwd()
sys.path.append(NOW_DIR + '\\classification')
sys.path.append(NOW_DIR + '\\detection')
sys.path.append(NOW_DIR + '\\anomaly')


# GPU가 사용 가능한 경우 cuda를 0으로 초기화하여 사용 / GPU가 사용 불가능한 경우 CPU로 초기화하여 CPU 사용
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# FastAPI 설정
app = FastAPI()


REGEX = re.compile('.jpg|.png|.jpeg|.gif|.bmp|.JPG|.PNG|.JPEG|.GIF|.BMP')

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

WHEELS = [
    {   
        'wheel_id': 'w1',
        'lost': 10,
        'loose': 5,
        'broken': 8,
    },
    {   
        'wheel_id': 'w2',
        'lost': 1,
        'loose': 20,
        'broken': 15,
    },
    {
        'wheel_id': 'w3',
        'lost': 0,
        'loose': 0,
        'broken': 0,
    },
    {
        'wheel_id': 'w4',
        'lost': 1,
        'loose': 2,
        'broken': 3,
    }
]


@app.get("/")
def read_root():
    return {"Hello": "SEMES"}


# anomaly로 post 요청이 왔을 때
@app.post("/anomaly")
def anomaly_detection():

    # 4개 휠 정보를 받지 못한 경우
    # if len(wheelAgg) != 4:
    #     detail = {
    #             'success': False,
    #             'message': '휠 데이터 개수가 4개가 아닙니다.'
    #         }
    #     raise HTTPException(status_code=400, detail=detail)

    try:
        # pandas dataframe화
        now_wheels = pd.DataFrame(WHEELS)
        now_wheels.set_index('wheel_id', inplace=True)

        # 이상 탐지 실행
        anomaly_reuslts = check_anomaly(now_wheels)
        
        # 이상탐지 결과를 return할 딕셔너리
        anomaly = {}
        
        for wheel in anomaly_reuslts.index:
            anomaly.update({wheel: int(anomaly_reuslts.loc[wheel, 'anomaly'])})
    
        return {
            "success": True,
            'message': '이상탐지 성공',
            'data': anomaly
            }

    except Exception:
        # 이상탐지 작업 중 오류가 발생한 경우
        detail = {
            'success': False,
            'message': '서버 내 오류'
        }
        raise HTTPException(status_code=500, detail=detail)


# infer로 get 요청이 왔을 때
@app.get("/infer")
# 휠 이미지 디텍션 후 볼트 분류 함수 실행(쿼리에 담긴 filePath 전달)
async def detect_classification(filePath: str, binary: bool):
    try:
        # # 추론 시작 시간 설정
        start_test = time.time()
        # cropped 된 볼트의 각 bounding box 좌표를 원소로하는 리스트를 받는다.
        image, bboxes = yolo.detect_bolt(filePath)
        # 확장자 삭제
        filePath = re.sub(REGEX, '', filePath)
        # 이미지 크롭 후 분류하여 이미지 저장 및 분류 결과 텍스트로 저장
        result = RegNet.ImgCrop(filePath, image, bboxes, binary)
        # 추론 종료 시간 저장
        reasoning_time = round(time.time() - start_test, 3)
        

        # 데이터를 JSON 형식으로 구성
        data = {
            "markedImage": "WHEEL_RESULT/{}.jpg".format(filePath),
            "bolts": result,
            "word": "저장중"
        }
        
        # 성공적으로 분류 작업을 수행한 경우
        return {
            "status": 200,
            "success": True,
            "reasoning_time": reasoning_time,
            "data": data
        }
    except FileNotFoundError:
        # 파일 경로가 잘못된 경우
        raise HTTPException(status_code=400, detail="필요한 값이 없습니다.")
    except Exception as e:
        # 분류 작업 중 오류가 발생한 경우
        raise HTTPException(status_code=500, detail="서버 내 오류")



# train으로 get 요청이 왔을 때
@app.get("/train")
# 전이학습 실행
def transfer_learning(acc: float, loss: float, fscore: float, lr: float, momentum: float, batch: int, set_epoch: int):
    try:
        result = Transfer.learning(acc, loss, fscore, lr, momentum, batch, set_epoch)
        # 데이터를 JSON 형식으로 구성
        data = {
            "changed": result[0],
            "acc": result[1],
            "loss": result[2],
            "fscore": result[3]
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
    

# predict로 다음주 교체 휠 예측 요청이 왔을 때
@app.get("/predict")
# 교체 휠 예측
def predict_change(lost: int, loose: int, broken : int):
    try:
        result = LinearRegression.predict_wheel(lost, loose, broken)
        # 데이터를 JSON 형식으로 구성
        data = {
            "predictNum" : result,
            "lost" : lost,
            "loose" : loose,
            "broken" : broken,
        }
        # 성공적으로 분류 작업을 수행한 경우
        return {
            "status": 200,
            "success": True,
            "data": data
        }
    except FileNotFoundError:
        # 파일 경로가 잘못된 경우
        raise HTTPException(status_code=400, detail="input 값이 정확하지 않습니다.")
    except Exception as e:
        # 분류 작업 중 오류가 발생한 경우
        raise HTTPException(status_code=500, detail="서버 내 오류")

