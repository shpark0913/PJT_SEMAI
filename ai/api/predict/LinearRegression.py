import os
import torch
import torch.nn as nn
import numpy as np
import pandas as pd
import numpy as np

if torch.cuda.is_available():
    device = torch.device("cuda")
    print("GPU is available. Using cuda")
else:
    device = torch.device("cpu")
    print("GPU is not available. Using CPU instead.")

# 선형 회귀 모델 load
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PREDICT_MODEL_DIR = os.path.join(os.path.join(BASE_DIR, "models"), "predict_model.pth")
predict_model = torch.load(PREDICT_MODEL_DIR, map_location=torch.device("cuda" if torch.cuda.is_available() else "cpu"))



# 교체 휠 예측
def predict_wheel(lost, loose, broken):
    predict_model.eval()
    # model.to(device)

    # 예측할 입력 데이터 정의
    inputs = torch.tensor([[lost, loose, broken]], dtype=torch.float32)

    # 모델에 입력 데이터 전달하여 예측값 계산
    predicted = predict_model(inputs)

    # 결과 출력
    print('Predicted price : {:.4f}'.format(predicted.item()))
    return predicted.item()