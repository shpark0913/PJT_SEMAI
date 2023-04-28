import axios from "axios";
import {store} from "../_store/store";

const token  = store.getState().user.token;
console.log(token);

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'accesstoken': token,
  }
})

export default Axios;