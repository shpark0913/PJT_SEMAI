import os
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
import warnings
warnings.filterwarnings('ignore')

NOW_PATH = os.getcwd()

# 지난 달 정상 휠 데이터
DATA_PATH = NOW_PATH + '/anomaly/data/'
DATA_NAME = 'wheel_diagnosis_result_2304.xlsx'

# 판다스 데이터프레임화
normal_df = pd.read_excel(DATA_PATH + DATA_NAME, index_col='wheel_id')
broken_mean = normal_df['broken'].mean()
loose_mean = normal_df['loose'].mean()
lost_mean = normal_df['lost'].mean()

contamination = 5 / len(normal_df)
clf = IsolationForest(max_samples=len(normal_df), random_state=0, contamination=contamination)
clf.fit(normal_df)

def check_anomaly(wheels:pd.DataFrame):
    # 이상 탐지 결과 칼럼 추가
    wheels['anomaly'] = 0

    for wheel in wheels.index:

        # 세 feature 값 모두 평균 이하일 경우 정상
        if (wheels.loc[wheel, 'broken'].item() <= broken_mean) and (wheels.loc[wheel, 'loose'].item() <= loose_mean) and (wheels.loc[wheel, 'lost'].item() <= lost_mean):
            wheels.loc[wheel, 'anomaly'] = 1
        
        # 하나라도 평균을 넘은 feature가 있을 경우 이상 탐지 수행
        else:
            pred = clf.predict(wheels.loc[[wheel], ['lost', 'loose', 'broken']])
            wheels.loc[wheel, 'anomaly'] = pred

    return wheels

