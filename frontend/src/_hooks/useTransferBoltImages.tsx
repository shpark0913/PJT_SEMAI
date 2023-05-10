import React from 'react';
import {useSubmit} from "react-router-dom";

function useTransferBoltImages() {
  const submit = useSubmit();

  /*
   * 필요한 것
   * 1. 클릭 시 모달창을 띄워 이미지를 확인하는 작업
   *    1-1. 클래스 이동
   *    - 이동 클릭 시 => preType과 nextType, imgUrl, originName, fileId
   *    - 취소 버튼과 이동하기 버튼
   *      - 취소 클릭 시 모달창 닫기, select는 유지
   *      - 이동 클릭 시 이동 submit 진행 (patch)
   *    1-2. 이미지 삭제
   *    - 삭제 클릭 시 => imgUrl, originName, fileId
   *    - 취소 버튼과 삭제하기 버튼
   *      - 취소 클릭 시 모달창 닫기, select는 유지
   *      - 삭제 클릭 시 삭제 submit 진행 (delete)
   *    1-3. 학습으로 이동
   *    - 학습 클릭 시 => imgUrl, originName, fileId
   *    - 취소 버튼과 학습 이동 버튼
   *      - 취소 클릭 시 모달창 닫기, select는 유지
   *      - 학습 이동 클릭 시 학습 이동 submit 진행 (post)
   *
   * 2. 진짜 axios 통신
   *    2-1. 클래스 이동
   *    - 이동 클릭 시 => preType과 nextType, fileId
   *    - method는 patch
   */

  // 진짜 제출
  const TransferClass = (preType: number, nextType:number, fileIds: number[]) => {
    const form = new FormData();
    form.append('preType', `${preType}`);
    form.append('nextType', `${nextType}`);
    form.append('fileIds', `[${fileIds. join(', ')}]`);
    form.forEach((val, key) => console.log(`${key} ${val}`))
    submit(form, {
      method: "PATCH"
    });
  }
  const TransferLearning = (fileIds: number[]) => {
    const form = new FormData();
    form.append('fileIds', `[${fileIds. join(', ')}]`);
    form.forEach((val, key) => console.log(`${key} ${val}`))
    submit(form, {
      method: "POST"
    });
  }
  const DeleteImages = (fileIds: number[]) => {
    const form = new FormData();
    form.append('fileIds', `[${fileIds. join(', ')}]`);
    form.forEach((val, key) => console.log(`${key} ${val}`))
    submit(form, {
      method: "DELETE"
    });
  }
  return { TransferClass, TransferLearning, DeleteImages }
}

export default useTransferBoltImages;