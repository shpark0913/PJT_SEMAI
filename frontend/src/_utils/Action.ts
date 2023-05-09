import Axios from "./Axios";

export async function TransferTestAction () {
  console.log("action 실행됩니다.");
  return null;
}

export async function TransferBoltImageAction({ request }: {request: any}) {
  console.log("액션 발동!")

  if (request.method === "PATCH") {
    console.log('클래스 이동하자')
    await Axios.patch('transition', {
      preType: "어쩌구",
      nextType: "저쩌구",
      fileId: [1, 2, 3],
    })
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

}