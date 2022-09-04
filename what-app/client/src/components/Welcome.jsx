import React from "react";
import styled from "styled-components";
import welcomeImage from "../assets/welcome-placeholder.jpeg";
const Welcome = () => {
  return (
    <Container>
      <div className="welcome-image">
        <img src={welcomeImage} alt="error" />
        <div className="message-container">
          <h1>WhatsApp Web</h1>
          <ul>
            <li>Send and recieve messages with keeping your phone online.</li>
            <li>
              use WhatsApp on up to 4 linked devieces and 1 phone at the same
              time.
            </li>
          </ul>
        </div>
      </div>
      <div className="end-to-end">
        <h3>
          <i className="fa-sharp fa-solid fa-lock"></i>
          &nbsp; End-to-end encrypted
        </h3>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 75%;
  height: 100%;
  color: #98a7b6;
  gap: 7rem;
  padding-top: 8rem;
  font-weight: 300;
  .welcome-image {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    img {
      border-radius: 20rem;
    }
    .message-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 0.6rem;
      h1 {
        font-weight: 200;
      }
      ul {
        list-style: none;
        text-align: center;
      }
    }
  }
  .end-to-end {
    h3 {
      font-weight: 200;
    }
  }
`;
export default Welcome;
