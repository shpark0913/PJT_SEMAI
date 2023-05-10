import Axios from "./Axios";

export async function TransferTestAction () {
  console.log("action 실행됩니다.");
  return null;
}

export async function TransferBoltImageAction({ request }: {request: any}) {
  let form = await request.formData();
  let data = Object.fromEntries(form);
  // console.log(data.fileIds);
  data.fileIds = data.fileIds.split(',').map(Number)

  if (request.method === "PATCH") {
    data.preType = Number(data.preType)
    data.nextType = Number(data.nextType)
    console.log(data);
    try {
      let response = await Axios.patch('transition', data)
      console.log(response);
    }
    catch (err) {
      console.log(err);
    }
  }
  else if (request.method === "DELETE") {
    console.log('이미지를 삭제하자')
    await Axios.delete('transition', {
      data: {
        fileId: [1, 2, 3, 4]
      }
    })
  }
  else if (request.method === "POST") {
    console.log('이미지를 학습폴더로 이동하자')
    await Axios.post('transition', {
      fileId: [1, 2, 3, 4]
    })
  }
  // window.location.reload();
  return null;
}