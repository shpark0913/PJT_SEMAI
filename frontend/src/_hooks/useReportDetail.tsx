import { setDetailOpen, setReportDetail } from "../_store/slices/reportDetailSlice";
import Axios from "../_utils/Axios";
import { useAppDispatch } from "./hooks";

function UseReportDetail() {
  const dispatch = useAppDispatch()
  const openReportDetail = async (wheelCheckId: number) => {
    dispatch(setDetailOpen());
    try {
      let response = await Axios.get(`report/detail/${wheelCheckId}`);
      dispatch(setReportDetail(response.data.data))
    }
    catch (err) {
      console.log(err);
    }
  }

  return { openReportDetail }
}

export default UseReportDetail;