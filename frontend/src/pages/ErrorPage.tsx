import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <h1>SOMETHING WENT WRONG!</h1>
      <h3>다시 시도해보세요</h3>
      <Link to="/">홈으로 이동하기</Link>
    </div>
  );
}

export default ErrorPage;