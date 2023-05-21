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
    font-size: 36px;
    margin-bottom: 15px;
  }
  & h2 {
    font-size: 30px;
  }
`
function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 500) {
    return (
      <ErrorSection>
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
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