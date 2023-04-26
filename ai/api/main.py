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

# 분류 결과 텍스트파일이 저장될 경로
RESULT_PATH = '../../../semes_bolt/DETECTION_RESULT/'
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
        # blot 이미지 저장 
        result = []
        # RESULT_PATH 경로에 이미지 파일 이름으로 텍스트 파일 생성 후
        with open(RESULT_PATH + filePath + '.txt', 'w') as f:
            # detect_bolt로 디텍팅한 볼트를 반복해서
            for i, now_bbox in enumerate(bboxes):
                # 좌상단 우하단 좌표
                x_min = float(now_bbox[1])
                y_min = float(now_bbox[2])
                x_max = float(now_bbox[3])
                y_max = float(now_bbox[4])
                # 해당 좌표로 이미지를 crop하여 저장
                cropped = image.crop((x_min, y_min, x_max, y_max))
                # 크롭된 이미지 분류
                classification_Result = RegNet.classification(cropped)
                # 분류된 이미지를 저장할 변수를 생성하고
                image_name = filePath + f'_{i+1}.png' 
                # 정상인 볼트로 분류되었을 경우
                if classification_Result == 2:
                    # BOLT_NORMAL 폴더로 경로 설정
                    save_directory = '../../../semes_bolt/BOLT_NORMAL/'
                    classification_directory = 'BOLT_NORMAL/'
                # 유실된 볼트로 분류되었을 경우
                elif classification_Result == 1:
                    # BOLT_LOST 폴더로 경로 설정
                    save_directory = '../../../semes_bolt/BOLT_LOST/'
                    classification_directory = 'BOLT_LOST/'
                # 파단된 볼트로 분류되었을 경우
                else:
                    # BOLT_BREAK 폴더로 경로 설정
                    save_directory = '../../../semes_bolt/BOLT_BREAK/'
                    classification_directory = 'BOLT_BREAK/'
                # 분류 결과를 result 리스트에 append
                result.append(classification_directory + image_name)
                # 이미지를 분류된 폴더에 맞게 저장
                cropped.save(save_directory + image_name)
                # 분류 결과와 이미지 정보를 텍스트 파일에 작성
                result_bbox = '{} {} {} {} {} {}'.format(classification_Result, int(now_bbox[0]), now_bbox[1], now_bbox[2], now_bbox[3], now_bbox[4])
                f.write(result_bbox + '\n')
            # 반복을 마쳤다면 텍스트 파일 작성 완료
            f.close()
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
