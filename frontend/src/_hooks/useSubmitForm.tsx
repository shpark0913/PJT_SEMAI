import React, { useCallback, useMemo } from "react";
import { useSubmit } from "react-router-dom";
import { setQueryObj } from "../_store/slices/reportPageSlice";
import { useAppDispatch } from "./hooks";
import useDate from "./useDate";

/** 레포트 조회 시 사용되는 함수 */
function useSubmitForm() {
  const submit = useSubmit();
  const dispatch = useAppDispatch();
  const { todayFormat } = useDate();
  const todayDate = useMemo(() => todayFormat(), [todayFormat]);

  const submitForm = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();

    if (e.currentTarget.form) {
      // form에 제출된 값을 불러와 formData 객체 생성
      let form = new FormData(e.currentTarget.form);

      // 이벤트가 발생한 객체가 page가 아니라면, page를 1로 초기화해야 함.
      if (e.currentTarget.name !== "page") {
        form.set("page", "1");
      }
      /*
       * errorFlag는 input의 type이 checkbox이므로 체크되지 않으면 값이 비어있게 된다.
       * 따라서 errorFlag의 value가 존재하지 않으면 0을 추가.
       *
       * 마찬가지로 time의 disabled 속성이 활성화된 경우에는 값이 없게 된다.
       * 이런 경우에는 ALL이라는 값을 추가
       */
      !form.has("errorFlag") && form.set("errorFlag", "0");
      !form.has("time") && form.set("time", "ALL");

      dispatch(setQueryObj(Object.fromEntries(form)));

      // form을 제출
      submit(form);
    }
  }, []);

  /** 기간을 지정해 레포트 조회 시 사용되는 함수 */
  const submitFormPeriod = useCallback((e: React.MouseEvent<HTMLButtonElement>, day: number) => {
    e.preventDefault();

    if (e.currentTarget.form) {
      // form에 제출된 값을 불러와 formData 객체 생성
      let form = new FormData(e.currentTarget.form);

      // page를 1로 초기화
      form.set("page", "1");

      if (day === 1) {   // 당일 조회면 startDate를 오늘 날짜로 변경
        form.set("startDate", todayDate);
      } else {           // 당일 조회가 아니면 날짜를 계산
        form.set("startDate", todayFormat(new Date(Date.now() - day * 24 * 60 * 60 * 1000)));
      }
      form.set("endDate", todayDate);
      !form.has("errorFlag") && form.set("errorFlag", "0");
      !form.has("time") && form.set("time", "ALL");

      dispatch(setQueryObj(Object.fromEntries(form)))

      submit(form);
    }
  }, [todayDate]);

  return { submitForm, submitFormPeriod }

}

export default useSubmitForm;