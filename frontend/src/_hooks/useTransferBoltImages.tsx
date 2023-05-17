// import React from 'react';
import {useSubmit} from "react-router-dom";
import {setIsConfirmModalOpen, setType} from "../_store/slices/transferPageSlice";
import {useAppDispatch} from "./hooks";

function useTransferBoltImages() {
  const dispatch = useAppDispatch();
  const submit = useSubmit();

  /** 모달창 open */
  const openConfirmModal = (preType: number, nextType: number) => {
    dispatch(setIsConfirmModalOpen(true));
    dispatch(setType({
      preType: preType,
      nextType: nextType
    }));
  }
  /** 양호, 유실, 파단 클래스 이동 */
  const TransferClass = (preType: number, nextType:number, fileIds: number[]) => {
    const form = new FormData();
    form.append('preType', `${preType}`);
    form.append('nextType', `${nextType}`);
    form.append('fileIds', `${fileIds}`);
    form.forEach((val, key) => console.log(`${key} ${val}`))
    submit(form, {
      method: "PATCH"
    });
  }
  /** 학습 클래스 이동 */
  const TransferLearning = (fileIds: number[]) => {
    const form = new FormData();
    form.append('fileIds', `${fileIds}`);
    submit(form, {
      method: "POST"
    });
  }
  /** 이미지 삭제 */
  const DeleteImages = (fileIds: number[]) => {
    const form = new FormData();
    form.append('fileIds', `${fileIds}`);
    submit(form, {
      method: "DELETE"
    });
  }
  /** 학습하기 */
  return { openConfirmModal, TransferClass, TransferLearning, DeleteImages }
}

export default useTransferBoltImages;