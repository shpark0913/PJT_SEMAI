import os
import torch
from copy import deepcopy
from PIL import ImageDraw
import torchvision.transforms as transforms

if torch.cuda.is_available():
    device = torch.device("cuda")
    print("GPU is available. Using cuda")
else:
    device = torch.device("cpu")
    print("GPU is not available. Using CPU instead.")

# 볼트 분석 모델 load
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CLASSIFICATION_MODEL_DIR = os.path.join(os.path.join(BASE_DIR, "models"), "classification_model.pth")
classification_model = torch.load(CLASSIFICATION_MODEL_DIR, map_location=torch.device("cuda" if torch.cuda.is_available() else "cpu"))


BINARY_MODEL_DIR  = os.path.join(os.path.join(BASE_DIR, "models"), "binary_model.pth")
bianry_classification_model = torch.load(BINARY_MODEL_DIR, map_location=torch.device("cuda" if torch.cuda.is_available() else "cpu"))


# 분류 결과 텍스트파일이 저장될 경로
RESULT_PATH = '../../dataset/semes_bolt/DETECTION_RESULT/'

# 최종 결과 이미지 저장 경로
WHEEL_RESULT_PATH = '../../dataset/semes_bolt/WHEEL_RESULT/'
# infer로 들어온 query의 파일 형식이 이미지 파일인지 확인
LABEL_COLOR = {
    0: (225, 240, 8),   # 파손
    1: (255, 0, 0),     # 유실
    3: (59, 85, 193),   # 풀림
}

# 모델을 평가 모드 설정
classification_model.eval()
bianry_classification_model.eval()

# 분류를 위한 볼트 이미지 파일 전처리
transformations = transforms.Compose([
    # 해상도를 (224,224)로 맞춰준다
    transforms.Resize((224, 224)),
    # 이미지를 PyTorch의 Tensor로 변환
    transforms.ToTensor(),
    # 흑백 이미지이기 때문에 1개의 채널을 정규화
    transforms.Normalize([0.5], [0.5])
])

def bianry_classification(image):
    # 이미지를 전처리(unsqueeze를 이용해 배치 차원을 추가하고, GPU를 사용)
    image = image.convert('RGB')
    image = transformations(image).unsqueeze(0).to(device)
    # 모델의 파라미터가 업데이트 되지 않고 연산의 중복을 막아 빠른 결과를 출력
    with torch.no_grad():
        # classification_model image를 넣어 예측
        outputs = bianry_classification_model(image)
        # torch.max 함수를 이용해 출력값 중 가장 큰 값을 가지는 인덱스
        _, preds = torch.max(outputs, 1)
    # 예측한 결과 preds에서 가장 확률이 높은 클래스를 class_names 리스트에서 찾아 반환
    return int(preds[0])


# 볼트 이미지를 읽어 결과를 반환하는 함수
def classification(image):
    # 이미지를 전처리(unsqueeze를 이용해 배치 차원을 추가하고, GPU를 사용)
    image = image.convert('RGB')
    image = transformations(image).unsqueeze(0).to(device)
    # 모델의 파라미터가 업데이트 되지 않고 연산의 중복을 막아 빠른 결과를 출력
    with torch.no_grad():
        # classification_model image를 넣어 예측
        outputs = classification_model(image)
        # torch.max 함수를 이용해 출력값 중 가장 큰 값을 가지는 인덱스
        _, preds = torch.max(outputs, 1)
    # 예측한 결과 preds에서 가장 확률이 높은 클래스를 class_names 리스트에서 찾아 반환
    return int(preds[0])


def ImgCrop(filePath, image, bboxes, binary):
    # blot 이미지 저장
    result = []

    # 그릴 수 있는 객체 생성
    result_image = deepcopy(image)
    result_image = result_image.convert('RGB')
    draw = ImageDraw.Draw(result_image)
    
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
            classification_Result = classification(cropped)
            # 분류된 이미지를 저장할 변수를 생성하고
            image_name = filePath + f'_{i+1}.png' 
            # 정상인 볼트로 분류되었을 경우
            if classification_Result == 2:
                if binary == True:
                    # 이진 분류
                    binary_Result = bianry_classification(cropped)
                    # 이진 분류 결과
                    if binary_Result == 0:
                        classification_Result = 3
                        save_directory = '../../dataset/semes_bolt/BOLT_LOOSE/'
                        classification_directory = 'BOLT_LOOSE/'
                    else:
                        save_directory = '../../dataset/semes_bolt/BOLT_NORMAL/'
                        classification_directory = 'BOLT_NORMAL/'
                # BOLT_NORMAL 폴더로 경로 설정
                else:
                    save_directory = '../../dataset/semes_bolt/BOLT_NORMAL/'
                    classification_directory = 'BOLT_NORMAL/'
            # 유실된 볼트로 분류되었을 경우
            elif classification_Result == 1:
                # BOLT_LOST 폴더로 경로 설정
                save_directory = '../../dataset/semes_bolt/BOLT_LOST/'
                classification_directory = 'BOLT_LOST/'
            # 파단된 볼트로 분류되었을 경우
            else:
                # BOLT_BREAK 폴더로 경로 설정
                save_directory = '../../dataset/semes_bolt/BOLT_BREAK/'
                classification_directory = 'BOLT_BREAK/'
            # 분류 결과를 result 리스트에 append
            result.append(classification_directory + image_name)
            # 이미지를 분류된 폴더에 맞게 저장
            cropped.save(save_directory + image_name)
            # 분류 결과와 이미지 정보를 텍스트 파일에 작성
            result_bbox = '{} {} {} {} {} {}'.format(classification_Result, int(now_bbox[0]), now_bbox[1], now_bbox[2], now_bbox[3], now_bbox[4])
            # 볼트 상태가 정상이 아닐 경우
            if classification_Result != 2:
                # 박스 그리기
                draw.rectangle((x_min, y_min, x_max, y_max), outline=LABEL_COLOR[classification_Result], width=5, fill=None)
            f.write(result_bbox + '\n')
        print(os.path.exists(WHEEL_RESULT_PATH))
        result_image.save(WHEEL_RESULT_PATH + filePath + '.png')
        # 반복을 마쳤다면 텍스트 파일 작성 완료
        f.close()
    
    return result