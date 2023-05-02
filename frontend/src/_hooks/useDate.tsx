import {useCallback} from "react";

function useDate() {
  /** 날짜, 시간 등... 2자리로 만들어줌 */
  const datePadStart = useCallback((date: number) => {
    return String(date).padStart(2, "0");
  }, []);

  const createWheelCheckId = useCallback((arg: number[]) => {
    return `${arg[0]}${datePadStart(arg[1])}${datePadStart(arg[2])}${datePadStart(arg[3])}${datePadStart(arg[4])}${datePadStart(arg[5])}`
  }, [datePadStart]);

  const timeFormat = useCallback((time: number) => {
    return `${datePadStart(time)}:00`
  }, [datePadStart]);

  const timeSecFormat = useCallback((arg: number[]) => {
    return `${datePadStart(arg[0])}:${datePadStart(arg[1])}:${datePadStart(arg[2])}`
  }, [datePadStart]);

  const dateFormat = useCallback((arg: number[]) => {
    return `${String(arg[0])}-${datePadStart(arg[1])}-${datePadStart(arg[2])}`
  }, [datePadStart]);

  /** 그냥 형식을 date 형식으로 만들어줌. */
  const timestampFormat = useCallback((timestamp=new Date()) => {
    let year = String(timestamp.getFullYear());
    let month = datePadStart(timestamp.getMonth() + 1);
    let day = datePadStart(timestamp.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, [datePadStart]);

  return { dateFormat, timeSecFormat, timestampFormat, timeFormat, createWheelCheckId }
}

export default useDate;