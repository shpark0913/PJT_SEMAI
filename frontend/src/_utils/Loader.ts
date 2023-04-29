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
  // await Axios.get('transition')
  //   .then(response => console.log(response.data))
  //   .catch(error => console.log(error))
  //
  // return null
}

export { BoltImageListsLoader }