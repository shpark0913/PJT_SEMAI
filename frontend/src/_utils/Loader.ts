import Axios from "./Axios";
import { json } from "react-router-dom";

export async function BoltImageListsLoader () {
  let BoltImageLists = [];

  let response = await Axios.get('transition');
  console.log(response);
  if (response.data.status === 404) {
    throw json (response.data);
  }
  BoltImageLists = response.data.data;
  console.log(BoltImageLists);
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

