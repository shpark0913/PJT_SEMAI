import React from 'react';
import {Link} from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <Link to="/">홈으로</Link>
    </div>
  );
}

export default LoginPage;