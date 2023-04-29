import OHTAllResult from "../components/DashboardPage/OHTAllResult";
import OHTCheck from "../components/DashboardPage/OHTCheck";
import OHTResult from "../components/DashboardPage/OHTResult";
import OHTTransition from "../components/DashboardPage/OHTTransition";
import axios from "axios";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { store } from "../_store/store";

export async function loader() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  let checkResult;

  await axios
    .get(`${BASE_URL}dashboard/main/2`, {
      headers: {
        'accesstoken' : store.getState().user.token,
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
