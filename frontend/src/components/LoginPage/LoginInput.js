import "./LoginInput.css";

import React from "react";

function LoginInput() {
  return (
    <div class="login">
      <form method="post">
        <input
          type="text"
          name="u"
          placeholder="Username"
          required="required"
          autoComplete="off"
          style={{ backgroundColor: "white" }}
          id="loginInput"
        />
        <input
          type="password"
          name="p"
          placeholder="Password"
          required="required"
          autoComplete="off"
          style={{ backgroundColor: "white" }}
          id="loginInput"
        />
        <button type="submit" class="btn btn-primary btn-block btn-large">
          진단 시스템 로그인
        </button>
      </form>
    </div>
  );
}

export default LoginInput;
