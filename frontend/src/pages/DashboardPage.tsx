import React from "react";

function DashboardPage() {
  const hi = process.env.REACT_APP_ELECTRON_START_URL;
  console.log(hi);
  console.log(process.env.REACT_APP_ELECTRON_START_URL);
  return (
    <div>
      <h1>대시보드 페이지</h1>
    </div>
  );
}

export default DashboardPage;
