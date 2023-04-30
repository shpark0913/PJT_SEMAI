import Axios from "./Axios";

async function BoltImageListsLoader () {
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

async function ReportListsLoader ({request}: {request: any}) {
  let ReportLists: string[] = [];
  const url = new URL(request.url);
  const search = url.search;
  console.log(search);

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

export { BoltImageListsLoader, ReportListsLoader }