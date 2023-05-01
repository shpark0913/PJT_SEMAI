export async function ReportListsAction ({params, request}: {params: any, request: any}) {

  let formData = await request.formData();
  console.log(formData);
  let name = formData.get("ohtSn");
  console.log(name);

  return null
}