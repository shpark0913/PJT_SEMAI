import re
import os
import torch
from PIL import Image
from io import BytesIO

NOW_DIR = os.getcwd()
os.chdir('./detection')

## CONSTANTS ##
IMAGE_SIZE = 2560
MODEL_PATH = 'weights/'
NORMAL_BBOXES_PATH = '../../../semes_bolt/DETECTION_NORMAL/'
PROBLEM_BBOXES_PATH = '../../../semes_bolt/DETECTION_PROBLEM/'
REGEX = re.compile('.jpg|.png|.jpeg|.gif|.bmp|.JPG|.PNG|.JPEG|.GIF|.BMP')

def load_detection_model(model_name, model_path=MODEL_PATH):
    path = model_path + model_name
    return torch.hub.load('.', 'custom', path=path, source='local')

## 서버를 실행시킬 때 바로 model load ##
model = load_detection_model('best.pt')

## 전처리 함수 ##
def preprocess_image(image, image_size=IMAGE_SIZE, interpolation=Image.LANCZOS):
    resized = image.resize((image_size, image_size), interpolation)
    b = BytesIO()

    # 메모리에 임시 저장
    resized.save(b, format='jpeg')
    return Image.open(b)


## 디텍션 함수 ##
def detect_bolt(image_path, model=model):
    '''
    1. 이미지 경로를 인자로 받는다.
    2. 해당 이미지에 대해 detection을 진행한다.
    3. detected objects(bolts)의 bounding box 정보를 반환한다.
    '''
    # filePath의 앞부분을 IMG_DIR에 저장
    IMG_DIR = os.path.dirname('../../../semes_bolt/WHEEL_ORIGIN/')
    # image에 해당 휠 이미지 열기
    now_image = Image.open(os.path.join(IMG_DIR, image_path))
    now_image = preprocess_image(now_image)

    result = model(now_image)

    # left, upper, right, lower
    bboxes = result.xyxy[0].tolist()
    n_bboxes = len(bboxes)
    
    # left, upper, width, height (normalized)
    bboxes_norm = result.xywhn[0].tolist()
    image_name = re.sub(REGEX, '', image_path)
    
    # bboxes 저장
    if n_bboxes < 11:
        label_path = PROBLEM_BBOXES_PATH
    else:
        label_path = NORMAL_BBOXES_PATH

    # 반환 값
    bboxes_response = []
    with open(label_path + image_name + '.txt', 'w') as f:
        for i in range(n_bboxes):
            bbox_str = '{} {} {} {} {}'.format(int(bboxes_norm[i][-1]), bboxes_norm[i][0], bboxes_norm[i][1], bboxes_norm[i][2], bboxes_norm[i][3])
            bbox_res_str = '{} {} {} {} {}'.format(int(bboxes[i][-1]), bboxes[i][0], bboxes[i][1], bboxes[i][2], bboxes[i][3])
            bboxes_response.append(list(bbox_res_str.split()))
            f.write(bbox_str + '\n')
        f.close()

    return now_image, bboxes_response