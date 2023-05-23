import Axios from "./Axios";
import { json } from "react-router-dom";

export async function BoltImageListsLoader () {
  let BoltImageLists = []
  try {
    let response = await Axios.get('transition');
    BoltImageLists = response.data.data;
    console.log(BoltImageLists);
  }
  catch (err: any) {
    console.log(err);
    if (err.response.status === 500) {
      throw json(
        {
          sorry: "서버 에러가 발생했습니다!",
        },
        { status: 500 }
      );
    }
  }
  return BoltImageLists;
}

export async function ReportListsLoader ({request}: {request: any}) {
  let ReportLists: string[] = [];
  const url = new URL(request.url);
  const search = url.search;

  try {
    let response = await Axios.get(`report/list${search}`);
    ReportLists = response.data.data;
    console.log(ReportLists);
  }
  catch (err) {
    console.log(err)
  }
  return ReportLists;
}

