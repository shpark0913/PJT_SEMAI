import "./LoginInput.css";

import axios from "axios";
import { useState } from "react";

function LoginInput() {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const onSubmitHandler = event => {
    event.preventDefault();

    let body = {
      userId: userId,
      userPwd: userPwd,
    };

    axios
      .post(`http://semes.info/users/`, body)
      // .post(`${process.env.REACT_APP_BASE_URL}users/`, body)
      .then(response => {
        // 로그인 성공 시 코드 작성(대시보드 이동, 토큰 저장)
        console.log(response);
      })
      .catch(error => {
        // 로그인 실패 시 코드 작성(Id, Pwd 초기화 & 경고 문구)
        console.log(error);
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
      </form>
    </div>
  );
}

export default LoginInput;
