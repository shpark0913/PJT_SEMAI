import "./Login.css";

import LoginInput from "./LoginInput";
import Logo from "../../assets/semesLogoWhite.png";
import styled from "styled-components";

const LoginDiv = styled.div`
  background-color: white;
`;

function Login() {
  return (
    <div>
      <div className="header">
        <div className="inner-header flex">
          <img src={Logo} alt="" style={{ width: "22%" }} />
          <LoginInput />
        </div>

        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
            color="#D6EBFF"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(214,235,255,0.7)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#D6EBFF" />
              <use xlinkHref="#gentle-wave" x="48" y="8" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      {/* <div className="content flex"></div> */}
    </div>
  );
}

export default Login;
