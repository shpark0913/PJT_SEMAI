import re
import os
import torch
from PIL import Image
from io import BytesIO

# 추론을 위해 작업 디렉토리 변경
NOW_DIR = os.getcwd()
os.chdir('./detection')


## CONSTANTS ##
TARGET_IMAGE_SIZE = 2048
CROP_SIZE = (200, 0, 200, 0)
IMAGE_ORIGIN_PATH = '../../../dataset/semes_bolt/WHEEL_ORIGIN/'
MODEL_PATH = 'weights/'
MODEL_NAME = 'yolo_0511.pt'
NORMAL_BBOXES_PATH = '../../../dataset/semes_bolt/DETECTION_NORMAL/'
PROBLEM_BBOXES_PATH = '../../../dataset/semes_bolt/DETECTION_PROBLEM/'
REGEX = re.compile('.jpg|.png|.jpeg|.gif|.bmp|.JPG|.PNG|.JPEG|.GIF|.BMP')


## yolo 모델
def load_detection_model(model_name, model_path=MODEL_PATH):
    path = model_path + model_name
    return torch.hub.load('.', 'custom', path=path, source='local')

## 서버를 실행시킬 때 바로 model load ##
model = load_detection_model(MODEL_NAME)
# confidence를 높여서 더욱 정밀하게 추론하도록 만듦
model.conf = 0.94
# 하나의 bbox에 대해 여러 라벨을 할당하지 못하도록 만듦
model.multi_label = False


## 전처리 함수
def preprocess_image(image, image_size=TARGET_IMAGE_SIZE, crop_size=CROP_SIZE, interpolation=Image.LANCZOS):
    '''
    Parameters
    - image: (PIL.JpegImagePlugin.JpegImageFile) 이미지 파일
    - image_size: (int) yolo input 이미지 사이즈 / default: 2048
    - crop_size: (list, tuple) "좌-상-우-하" 순서로 자를 길이 / default: (0, 0, 0, 0)
    - interpolation: (int) interpolation 방식 / default: Image.LANCZOS
    '''

    # 이미지 crop -> 정사각형으로 만들기
    image_width, image_height = image.size
    cropped = image.crop((crop_size[0], crop_size[1], image_width-crop_size[2], image_height-crop_size[3]))

    # resize
    resized = cropped.resize((image_size, image_size), interpolation)
    b = BytesIO()
    resized.save(b, 'jpeg')
    return Image.open(b)


## 디텍션 함수 ##
def detect_bolt(image_path, model=model):
    '''
    1. 이미지 경로를 인자로 받는다.
    2. 해당 이미지에 대해 detection을 진행한다.
    3. detected objects(bolts)의 bounding box 정보를 반환한다.
    '''

    os.chdir('./detection')
    
    # image에 해당 휠 이미지 열기
    now_image = Image.open(IMAGE_ORIGIN_PATH + image_path)

    # 전처리 수행
    now_image = preprocess_image(now_image)

    # 추론 수행
    result = model(now_image, size=TARGET_IMAGE_SIZE)

    # bbox 좌표(left, upper, right, lower)
    bboxes = result.xyxy[0].tolist()
    n_bboxes = len(bboxes)
    
    # bbox 좌표(left, upper, width, height)(normalized)
    bboxes_norm = result.xywhn[0].tolist()
    image_name = re.sub(REGEX, '', image_path)
    
    # bboxes 결과 저장 폴더
    if n_bboxes != 11:
        label_path = PROBLEM_BBOXES_PATH
    else:
        label_path = NORMAL_BBOXES_PATH

    bboxes_response = []
    # bbox 결과 저장
    with open(label_path + image_name + '.txt', 'w') as f:
        for i in range(n_bboxes):
            bbox_str = '{} {} {} {} {}'.format(int(bboxes_norm[i][-1]), bboxes_norm[i][0], bboxes_norm[i][1], bboxes_norm[i][2], bboxes_norm[i][3])
            bboxes_response.append([int(bboxes[i][-1]), bboxes[i][0], bboxes[i][1], bboxes[i][2], bboxes[i][3]])
            f.write(bbox_str + '\n')
        f.close()

    # 작업 수행 후 작업 디렉토리 되돌리기
    os.chdir('../')
    return now_image, bboxes_response

# 작업 수행 후 작업 디렉토리 되돌리기
os.chdir('../')