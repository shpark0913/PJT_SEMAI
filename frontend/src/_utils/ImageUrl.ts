
function ImageUrl(imgUrl: string | undefined):string {
  const IMG_URL = process.env.REACT_APP_IMG_URL;
  return `${IMG_URL}${imgUrl}`
}

export default ImageUrl;