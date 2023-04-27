import OHTAllResult from "../components/DashboardPage/OHTAllResult";
import OHTCheck from "../components/DashboardPage/OHTCheck";
import OHTResult from "../components/DashboardPage/OHTResult";
import OHTTransition from "../components/DashboardPage/OHTTransition";
import axios from "axios";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  let checkResult;
  await axios
    .get(`http://semes.info:8888/dev/dashboard/main/2`, {
      headers: {
        accesstoken:
          "eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjgyNDgxODQ0NjkxLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM3Nzc4NDQsInN1YiI6ImFjY2Vzcy10b2tlbiIsInJvbGUiOiJBRE1JTiJ9.DsMQURAqUMNNA-aU7SoSLFL19FEtQkutnp5b3HsMX0k",
      },
    })
    .then(response => {
      checkResult = response.data.data;
    });

  return [checkResult];
}

const MainGrid = styled.section`
  display: grid;
  width: 100%;
  height: calc(100vh - 60px);
  grid-template-rows: 34% 34% 32%;
  grid-template-columns: 70% 30%;
`;

function DashboardPage() {
  const checkResult: any = useLoaderData();

  return (
    <MainGrid>
      <OHTResult data={checkResult[0]} />
      <OHTCheck />
      <OHTTransition />
      <OHTAllResult />
    </MainGrid>
  );
}

export default DashboardPage;
