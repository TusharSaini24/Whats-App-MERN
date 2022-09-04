import React, { useEffect } from "react";
import styled from "styled-components";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt from "jwt-decode";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from "../assets/qr-placeholder.png";
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("whats-app-user")) {
      navigate("/");
    }
  }, []);

  const credentialRes = async (credentialResponse) => {
    const user = jwt(credentialResponse.credential);

    const { data } = await axios.post(`${loginRoute}`, {
      username: user.name,
      email: user.email,
      profilePic: user.picture,
    });
    localStorage.setItem("whats-app-user", JSON.stringify(data.user));
    navigate("/");
  };

  return (
    <Container>
      <div className="header">
        <h1>whatapp web clone</h1>
      </div>
      <div className="card-view">
        <div className="instruction">
          <h1>To use WhatsApp on your computer :</h1>
          <ol>
            <li>You need to sign-in using Google Account.</li>
            <li>You can anytime logout from the Web.</li>
            <li>
              Click on sign-in button to continue using the WhatsApp Clone.
            </li>
          </ol>
          <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLINET_ID}`}>
            <GoogleLogin
              onSuccess={credentialRes}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
        <div className="qrCode">
          <img src={QRCode} alt="QrCode" />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d5dad6;
  width: 100%;
  height: 100vh;
  color: white;
  .header {
    background-color: #00a884;
    width: 100%;
    height: 10rem;
    h1 {
      font-size: 1.4rem;
      font-weight: 200;
      color: white;
      margin-top: 2rem;
      margin-left: 2rem;
    }
  }
  .card-view {
    display: flex;
    background-color: white;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: -4rem;
    flex-wrap: wrap;
    justify-content: space-evenly;
    box-shadow: 5px 10px 10px #888888;
    .instruction {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      /* margin-left: 3rem; */
      margin-bottom: 2rem;
      color: #525252;
      gap: 2rem;
      h1 {
        font-size: 1.8rem;
        font-weight: 300;
      }
      ol {
        display: flex;
        flex-direction: column;
        margin-left: 2rem;
        gap: 1rem;
        li {
          font-size: 1.2rem;
          font-weight: 300;
        }
      }
    }
    .qrCode {
      background-color: white;
      img {
        height: 20rem;
        width: 20rem;
      }
    }
  }
`;

export default Login;
