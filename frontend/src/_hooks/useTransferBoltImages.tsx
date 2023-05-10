import React from 'react';

function UseTransferBoltImages() {
  /*
   * 필요한 것
   * 1. 클릭 시 모달창을 띄워 이미지를 확인하는 작업
   *    1-1. 클래스 이동
   *    - 이동 클릭 시 => preType과 nextType, imgUrl, originName, fileId
   *    - 취소 버튼과 이동하기 버튼
   *      - 취소 클릭 시 모달창 닫기, select는 유지
   *      - 이동 클릭 시 이동 submit 진행
   *    1-2. 이미지 삭제
   *    - 삭제 클릭 시 => imgUrl, originName, fileId
   *    - 취소 버튼과 삭제하기 버튼
   *      - 취소 클릭 시 모달창 닫기, select는 유지
   *      - 삭제 클릭 시 삭제 submit 진행
   *
   *
   * 1. 클래스를 이동하기 (preType에서 nextType으로), method는 patch
   * 2. 이미지를 삭제하기
   * 3. 이미지를 학습으로 이동
   */
  return (
    <div></div>
  );
}

export default UseTransferBoltImages;