import os
import torch
from copy import deepcopy
from PIL import ImageDraw
import torchvision.transforms as transforms
# PyTorch에서 이미지 데이터 처리와 관련된 함수와 모델들을 제공
from torchvision import datasets
# DataLoader를 이용하여 데이터셋에서 미니배치(minibatch)를 추출 
from torch.utils.data import DataLoader
# PyTorch에서 제공하는 신경망 모듈
import torch.nn as nn
# 학습에 사용되는 최적화 알고리즘
import torch.optim as optim
import numpy as np


from sklearn.metrics import f1_score

if torch.cuda.is_available():
    device = torch.device("cuda")
    print("GPU is available. Using cuda")
else:
    device = torch.device("cpu")
    print("GPU is not available. Using CPU instead.")

# 분류 결과 텍스트파일이 저장될 경로
RESULT_PATH = './models'


def f1score(test_loader, model):
    # F1 score
    # 모든 데이터의 예측 결과와 정답을 저장할 리스트
    all_preds = []
    all_labels = []

    # 파라미터 업데이트 없이 forward propagation을 수행
    with torch.no_grad():
        # test_loader의 데이터 셋을 반복해서
        for inputs, labels in test_loader:
            # 입력 이미지, 라벨 정보를 GPU를 사용하기 위해 to.device()사용
            inputs, labels = inputs.to(device), labels.to(device)
            # 모델에 이미지 학습 (forward propagation이 이루어지며, 모델은 입력을 받아 출력값을 계산)
            outputs = model(inputs)
            # 모델이 예측한 답을 numpy로 변환 all_preds에 append
            all_preds.append(outputs.argmax(dim=1).cpu().numpy())
            # 실제 정답을 numpy로 변환해서 all_lables에 append
            all_labels.append(labels.cpu().numpy())
    # all_preds와 all_labels를 하나의 넘파이 배열 합쳐서 변환
    all_preds = np.concatenate(all_preds, axis=0)
    all_labels = np.concatenate(all_labels, axis=0)
    # 정답과 예측결과로 f1 score를 구함
    f1_micro = f1_score(all_labels, all_preds, average='micro')         # 각 클래스의 샘플을 모두 더해 계산
    f1_weighted = f1_score(all_labels, all_preds, average='weighted')   # 각 클래스의 샘플 수에 따라 가중치 적용 후 계산
    f1_macro = f1_score(all_labels, all_preds, average='macro')         # 각 클래스별로 계산 후 평균 냄

    return f1_micro


def learning():
    # 학습데이터 전처리
    train_transform = transforms.Compose([
        # 해상도를 (224,224)로 맞춰준다 (a fixed resolution of 224×224 is best, even at higher flops : [논문]Designing Network Design Spaces - [저자]Facebook AI Research (FAIR))
        transforms.Resize((224, 224)),
        # 이미지를 좌우로 뒤집어서 데이터 증강(augmentation)을 수행(확률을 높여준)
        transforms.RandomHorizontalFlip(),
        # 이미지를 PyTorch의 Tensor로 변환
        transforms.ToTensor(),
        # 흑백 이미지이기 때문에 1개의 채널을 정규화(흑백이미지는 보통 (평균 : 0.5 / 표준편차 : 0.5)로 정규화)
        transforms.Normalize([0.5], [0.5])
    #     transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    # 테스트데이터 전처리
    test_transform = transforms.Compose([
        # 해상도를 (224,224)로 맞춰준다
        transforms.Resize((224, 224)),
        # 이미지를 PyTorch의 Tensor로 변환
        transforms.ToTensor(),
        # 흑백 이미지이기 때문에 1개의 채널을 정규화
        transforms.Normalize([0.5], [0.5])
    #     transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # 데이터가 저장된 경로
    data_dir = '../../semes_transfer/'
    print(os.path.join(data_dir, 'train'))

    # 데이터가 저장된 경로에서 ImageFolder를 이용하여 이미지 데이터셋을 전처리한 후 로드(transforms_*==전처리 수행)
    train_datasets = datasets.ImageFolder(os.path.join(data_dir, 'train'), train_transform)
    test_datasets = datasets.ImageFolder(os.path.join(data_dir, 'val'), test_transform)

    # DataLoader를 이용 / 데이터셋에서 미니배치(minibatch)를 추출 
    # (batch_size==미니배치의 크기 / shuffle==데이터셋을 섞을지 여부 / num_workers==데이터셋을 불러올 때 사용할 프로세스 수)
    train_loader = DataLoader(train_datasets, batch_size=128, shuffle=True, num_workers=4)
    test_loader = DataLoader(test_datasets, batch_size=128, shuffle=True, num_workers=4)

    # 수행 결과를 출력
    print('학습 데이터셋 크기:', len(train_datasets))
    print('테스트 데이터셋 크기:', len(test_datasets))

    # 학습된 클래스 이름과 수행 결과를 출력
    class_names = train_datasets.classes
    print('클래스:', class_names)


    # 볼트 분석 모델 load
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    CLASSIFICATION_MODEL_DIR = os.path.join(os.path.join(BASE_DIR, "models"), "classification_model.pth")
    classification_model = torch.load(CLASSIFICATION_MODEL_DIR)
    classification_model.to(device)

    # 손실 함수와 최적화 알고리즘 정의
    criterion = nn.CrossEntropyLoss()
    # optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)
    optimizer = optim.Adam(model.parameters(), lr=0.001)


    # 학습 epochs 설정
    num_epochs = 30

    # epoch에 따른 손실 값과 정확도를 저장하는 리스트
    train_loss_list = []
    train_acc_list = []
    test_loss_list = []
    test_acc_list = []

    # 최적 모델
    best_loss = '현재 모델의 loss'
    best_loss_epoch = 0

    best_acc = '현재 모델의 정확도'
    best_acc_epoch = 0

    result = []
    # 설정한 epochs 만큼 반복
    for epoch in range(num_epochs):
        # Train --------------------------------------------------------------------
        # 모델을 학습모드로 설정
        classification_model.train()
        # 현재까지 누적된 손실을 저장할 변수 초기화
        train_loss = 0
        # 현재까지 맞춘 이미지의 수를 저장할 변수 초기화
        train_correct = 0
        # 현재까지 학습한 이미지 수를 저장할 변수 초기화
        train_cnt = 0

        # 배치 단위로 나눈 학습 데이터 순회하며 불러와서
        for batch_idx, (inputs, labels) in enumerate(train_loader):
            # 입력 이미지, 라벨 정보를 GPU를 사용하기 위해 to.device()사용
            inputs, labels = inputs.to(device), labels.to(device)
            # 학습 전, 이전 학습에서 계산된 gradient 값을 0으로 초기화
            optimizer.zero_grad()
            # 모델에 이미지 학습 (forward propagation이 이루어지며, 모델은 입력을 받아 출력값을 계산)
            outputs = classification_model(inputs)
            # 모델이 예측한 출력값(outputs)과 실제 정답(labels)을 비교하여 손실 값을 계산
            loss = criterion(outputs, labels)
            # 손실 값의 gradient를 계산(backward propagation이 이루어지며, 손실 함수를 모델의 출력값으로 미분한 gradient 값을 계산)
            loss.backward()
            # optimization - 계산된 gradient 값을 이용하여 모델의 파라미터를 업데이트
            optimizer.step()

            # 현재 배치에서 계산된 손실 값을 train_loss에 더함
            train_loss += loss.item()
            # 출력값(outputs) 중에서 가장 큰 값(_)과 그 값이 존재하는 인덱스(predicted)를 반환
            _, predicted = outputs.max(1)
            # 배치에 포함되어 학습한 이미지의 수를 train_cnt에 더함
            train_cnt += labels.size(0)
            # 현재 배치에서 맞춘 개수를 train_correct에 더함
            train_correct += predicted.eq(labels).sum().item()
        
        # epoch 단위로 평균 손실 값과 정확도를 계산
        train_loss /= len(train_loader)
        train_acc = 100 * train_correct / train_cnt

        # 계산한 평균 손실 값과 정확도를 리스트에 추가
        train_loss_list.append(train_loss)
        train_acc_list.append(train_acc)

        # Test ---------------------------------------------------------------------
        # 모델을 평가 모드로 설정
        classification_model.eval()
        # 현재까지 누적된 손실을 저장할 변수 초기화
        test_loss = 0
        # 현재까지 맞춘 이미지의 수를 저장할 변수 초기화
        test_correct = 0
        # 현재까지 학습한 이미지 수를 저장할 변수 초기화
        test_cnt = 0

        # 모델의 gradient가 필요하지 않아 파라미터에 대한 업데이트를 수행하지 않으면서 forward propagation을 수행해 시간 단축
        with torch.no_grad():
            # 배치 단위로 나눈 테스트 데이터 순회하며 불러와서
            for batch_idx, (inputs, labels) in enumerate(test_loader):
                # 입력 이미지, 라벨 정보를 GPU를 사용하기 위해 to.device()사용
                inputs, labels = inputs.to(device), labels.to(device)
                # 모델에 이미지 학습 (forward propagation이 이루어지며, 모델은 입력을 받아 출력값을 계산)
                outputs = classification_model(inputs)
                # 모델이 예측한 출력값(outputs)과 실제 정답(labels)을 비교하여 손실 값을 계산
                loss = criterion(outputs, labels)

                # 현재 배치에서 계산된 손실 값을 test_loss에 더함
                test_loss += loss.item()
                # 출력값(outputs) 중에서 가장 큰 값(_)과 그 값이 존재하는 인덱스(predicted)를 반환
                _, predicted = outputs.max(1)
                # 배치에 포함되어 학습한 이미지의 수를 test_cnt에 더함
                test_cnt += labels.size(0)
                # 현재 배치에서 맞춘 개수를 test_correct에 더함
                test_correct += predicted.eq(labels).sum().item()
        
        # epoch 단위로 평균 손실 값과 정확도를 계산
        test_loss /= len(test_loader)
        test_acc = 100 * test_correct / test_cnt
        # 계산한 평균 손실 값과 정확도를 리스트에 추가
        test_loss_list.append(test_loss)
        test_acc_list.append(test_acc)

    flscore = f1score(test_loader, classification_model)

    result.append(True)
    result.append(best_acc)
    result.append(best_loss)
    result.append(flscore)

    return result

