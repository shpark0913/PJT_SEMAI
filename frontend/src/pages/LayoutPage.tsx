import React from 'react';
import {Link, Outlet} from "react-router-dom";

function LayoutPage() {
  return (
    <div>
      <nav>
        <Link to='/'>대시보드</Link>
        <Link to='/report'>레포트</Link>
        <Link to='/transfer'>전이학습</Link>
        <Link to='/login'>로그인</Link>
      </nav>
      <Outlet />
      <footer>A301</footer>
    </div>
  );
}

export default LayoutPage;