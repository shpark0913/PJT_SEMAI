// import React from 'react';
import {useSubmit} from "react-router-dom";
import {setIsConfirmModalOpen, setType} from "../_store/slices/transferPageSlice";
import {useAppDispatch} from "./hooks";
import React from "react";
import Axios from "../_utils/Axios";
import {toast} from "react-toastify";
import {setIsTraining} from "../_store/slices/trainSlice";

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
  const Train = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(setIsTraining(true));

    if (e.currentTarget.form){
      const form = new FormData(e.currentTarget.form);
      const paramsObj = Object.fromEntries(form);
      console.log(paramsObj);
      try {
        const response = await Axios.get('transition/learning', {
          params: paramsObj,
        })
        let { changed, acc, loss, fscore} = response.data.data
        dispatch(setIsConfirmModalOpen(false));
        dispatch(setIsTraining(false));
        if (changed === "success") {    // 성공 시
          toast.success(`모델이 교체됐습니다. (acc: ${acc}, fscore: ${fscore}, loss: ${loss})`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        else {                                   // 실패 시
          toast.error(`모델이 교체되지 않았습니다. (acc: ${acc}, fscore: ${fscore}, loss: ${loss})`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }

      }
      catch (error) {
        console.log(error)
      }
    }
  }
  return { openConfirmModal, TransferClass, TransferLearning, DeleteImages, Train }
}

export default useTransferBoltImages;