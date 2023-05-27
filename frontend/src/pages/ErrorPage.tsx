import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import styled from "styled-components";

const ErrorSection = styled.section`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & h1 {
    font-size: 60px;
    margin-bottom: 20px;
  }
  & h2 {
    font-size: 30px;
  }
`
function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error) && error.data.status === 404) {
    return (
      <ErrorSection>
        <h1>{error.data.message}</h1>
        <h2>관리자 계정으로 접속해주세요.</h2>
      </ErrorSection>
    );
  }

  return (
    <ErrorSection>
      <h1>SOMETHING WENT WRONG!</h1>
      <h2>다시 시도해보세요</h2>
    </ErrorSection>
  );
}

export default ErrorPage;