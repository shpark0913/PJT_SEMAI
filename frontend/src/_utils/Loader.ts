import Axios from "./Axios";

export async function BoltImageListsLoader () {
  let BoltImageLists = []
  try {
    let response = await Axios.get('transition');
    BoltImageLists = response.data;
    console.log(BoltImageLists);
  }
  catch (err) {
    console.log(err)
  }
  return BoltImageLists;
}

export async function ReportListsLoader ({request}: {request: any}) {
  let ReportLists: string[] = [];
  const url = new URL(request.url);
  // errorFlag가 없으면 0으로 지정 (==전체를 보겠다)
  if (!url.searchParams.has("errorFlag")) {
    url.searchParams.set('errorFlag', "0");
  }
  if (!url.searchParams.has("time")) {
    url.searchParams.set('time', "ALL");
  }
  const search = url.search;
  // console.log(search);


  try {
    let response = await Axios.get(`report/list${search}`);
    ReportLists = response.data;
    console.log(ReportLists);
  }
  catch (err) {
    console.log(err)
  }
  return ReportLists;
}