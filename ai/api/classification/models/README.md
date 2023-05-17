# [SEMES] - 볼트 이상 탐지 분류 모델

### 볼트 이상 분류 모델

- model : RegNet1.6

- criterion : CrossEntropyLoss

- optimizer : 
  
  - Adam
    
    - Learning rate = 0.001
  
  - SGD
    
    - Learning rate = 0.0001 / momentum =0.9

- Result
  
  - 학습 데이터셋 크기: 26380(구형 : 11876 / 신형 : 14504)
  
  - 테스트 데이터셋 크기: 5400 (실제 SEMES 데이터 2464 / 실제 환경에 맞춘 데이터 구형 1320 / 신형 1616)
  
  - 클래스: ['BOLT_BREAK', 'BOLT_LOST', 'BOLT_NORMAL']
  
  - - P(Precision) : 모델이 True라고 분류한 것 중 실제 True인 것의 비율
      
      - BOLT_BREAK : 99.85%
      
      - BOLT_LOST : 100%
      
      - BOLT_NORMAL : 100%
    
    - R(Recall): 실제 True인 것 중에서 모델이 True라고 에측한 것의 비율
      
      - BOLT_BREAK : 100%
      
      - BOLT_LOST : 99.93% 
      
      - BOLT_NORMAL : 100%
  
  - Acc: 99.98%
  
  - Loss: 0.0204

---

### 풀림 이진 분류 모델

- model : RegNet1.6

- criterion : CrossEntropyLoss

- optimizer 
  
  - Adam
    
    - Learning rate = 0.001
  
  - SGD
    
    - Learning rate = 0.0001 / momentum =0.9

- Result
  
  - 학습 데이터셋 크기: 29100(구형 :  11876 / 신형 : 14504)
  
  - 테스트 데이터셋 크기: 5572 (실제 SEMES 데이터 2464 / 실제 환경에 맞춘 데이터 구형 1892 / 신형 1628)
  
  - 클래스: ['BOLT_LOOSE', 'BOLT_NORMAL']
  
  - - P(Precision) : 모델이 True라고 분류한 것 중 실제 True인 것의 비율
      
      - BOLT_LOOSE : 93.64%
      
      - BOLT_NORMAL : 99.94%
    
    - R(Recall): 실제 True인 것 중에서 모델이 True라고 에측한 것의 비율
      
      - BOLT_LOOSE : 95.44%
      
      - BOLT_NORMAL : 99.91%
  
  - Acc: 97.24%
  
  - Loss: 0.0880
