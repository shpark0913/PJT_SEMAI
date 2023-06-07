import "./LoginInput.css";

import { setToken, setUserName } from "../../_store/slices/userSlice";

import axios from "axios";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
import { useState } from "react";


function LoginInput() {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [loginInfo, setLoginInfo] = useState("");
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmitHandler = event => {
    event.preventDefault();

    let body = {
      userId: userId,
      userPwd: userPwd,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}user`, body)
      .then(response => {
        if (response.data.status === 200) {
          const token = response.data.data.accesstoken;
          const userName = response.data.data.userName;
          dispatch(setUserName(userName));
          dispatch(setToken(token));

          window.location.pathname = '/'
        } else {
          setUserId("");
          setUserPwd("");
          setLoginInfo("로그인 정보를 확인하십시오.");
        }
      })
      // .then(() => navigate("/"))
      .catch(error => {
        // 로그인 실패 시 코드 작성(Id, Pwd 초기화 & 경고 문구)
        console.log(error);
        setLoginInfo("로그인 정보를 확인하십시오.");
      });
  };

  const onIdHandler = event => {
    setUserId(event.target.value);
  };

  const onPwdHandler = event => {
    setUserPwd(event.target.value);
  };

  return (
    <div className="login">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="u"
          placeholder="Username"
          required="required"
          autoComplete="off"
          id="loginInput"
          value={userId}
          onChange={onIdHandler}
          style={{ backgroundColor: "white" }}
          autoFocus={true}
        />
        <input
          type="password"
          name="p"
          placeholder="Password"
          required="required"
          autoComplete="off"
          id="passwordInput"
          value={userPwd}
          onChange={onPwdHandler}
          style={{ backgroundColor: "white" }}
        />
        <button type="submit" className="btn btn-primary btn-block btn-large">
          진단 시스템 로그인
        </button>
        <div style={{ marginTop: "10px" }}>{loginInfo}</div>
      </form>
    </div>
  );
}

export default LoginInput;
