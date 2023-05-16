import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
import warnings
warnings.filterwarnings('ignore')

# 지난 달 정상 휠 데이터
DATA_PATH = 'DATA/'
DATA_NAME = 'wheel_diagnosis_result_2304.xlsx'

# 판다스 데이터프레임화
normal_df = pd.read_excel(DATA_PATH + DATA_NAME, index_col='wheel_id')
broken_mean = normal_df['broken'].mean()
loose_mean = normal_df['loose'].mean()
lost_mean = normal_df['lost'].mean()

contamination = 5 / len(normal_df)
clf = IsolationForest(max_samples=len(normal_df), random_state=0, contamination=contamination)
clf.fit(normal_df)

def check_anormal(wheel_agg:pd.DataFrame):
    ## 세 feature 값 모두 평균 이하인지 체크
    
    # 평균 이하일 경우 이상 아님
    if (wheel_agg['broken'].item() <= broken_mean) and (wheel_agg['loose'].item() <= loose_mean) and (wheel_agg['lost'].item() <= lost_mean):
        return '문제 없음'
    
    
    ## 평균이 넘는 feature가 하나라도 있을 경우 이상 탐지 수행

    else:
        pred = clf.predict(wheel_agg)

        # 이상이 아닐 경우
        if pred == 1:
            return '문제 없음'
        
        # 이상일 경우
        elif pred == -1:
            return '문제 있음!'
        
        # 에러 발생
        else:
            return '에러 발생'

