export async function ReportListsAction ({request}: {request: Request}) {
  let formData = await request.formData();
  console.log(formData);
  const url = new URL(request.url);
  console.log(url);
  if (!url.searchParams.has("errorFlag")) {
    url.searchParams.set('errorFlag', "0");
  }

  console.log(url);
  return url;
}

export async function TransferTestAction () {
  console.log("action 실행됩니다.");
  return null;
}