// import React from 'react';
import {useSubmit} from "react-router-dom";
import {setIsConfirmModalOpen, setType} from "../_store/slices/transferPageSlice";
import {useAppDispatch} from "./hooks";
import React from "react";
import Axios from "../_utils/Axios";

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

    if (e.currentTarget.form){
      const form = new FormData(e.currentTarget.form);
      const Obj = Object.fromEntries(form);
      console.log(Obj);
      try {
        const response = await Axios.get('transition/learning', {
          params: Obj,
        })
        console.log(response);
      }
      catch (error) {
        console.log(error)
      }
    }
    // if (e.currentTarget.form) {
    //   let form = new FormData(e.currentTarget.form);
    //   dispatch(setQueryObj({page: "1"}))
    //   setStartDate(todayFormat( new Date(Date.now() - (day*24*60*60*1000)) ));
    //   setEndDate(todayDate);
    //
    //   form.set('page', "1");
    //   form.set('startDate', todayFormat( new Date(Date.now() - (day*24*60*60*1000)) ));
    //   form.set('endDate', todayDate);
    //   !form.has("errorFlag") && form.set("errorFlag", "0")
    //   !form.has("time") && form.set("time", "ALL")
    //
    //   submit(form);
    // }

  }
  return { openConfirmModal, TransferClass, TransferLearning, DeleteImages, Train }
}

export default useTransferBoltImages;