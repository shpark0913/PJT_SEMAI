import {useCallback} from "react";

function useDate() {
  /** 숫자가 input으로 들어올 때, 2자리 이상으로 만들어줌 */
  const datePadStart = useCallback((date: number) => {
    return String(date).padStart(2, "0");
  }, []);

  /** 년월일시분초 합치는 함수 */
  const wheelCheckId = useCallback((arg: number[]) => {
    let idList = arg.map(num => datePadStart(num));
    return idList.join('');
  }, [datePadStart]);

  /** 시:분:초 형식으로 변환 */
  const timeFormat = useCallback((arg: number[]) => {
    let idList = arg.map(num => datePadStart(num));
    return idList.join(':');
  }, [datePadStart]);

  /** 년-월-일 형식으로 변환 */
  const dateFormat = useCallback((arg: number[]) => {
    let idList = arg.map(num => datePadStart(num));
    return idList.join('-');
  }, [datePadStart]);

  /** 오늘 날짜 가져오기. */
  const todayFormat = useCallback((timestamp=new Date()) => {
    let year = String(timestamp.getFullYear());
    let month = datePadStart(timestamp.getMonth() + 1);
    let day = datePadStart(timestamp.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, [datePadStart]);

  return { dateFormat, todayFormat, timeFormat, wheelCheckId }
}

export default useDate;