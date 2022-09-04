import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { getAllUsersRoute, host } from "../utils/APIRoutes";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contactList, setContactList] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  const navigate = useNavigate();
  useEffect(() => {
    const run = async () => {
      if (!localStorage.getItem("whats-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("whats-app-user"))
        );
      }
    };
    run();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const run = async () => {
      if (currentUser) {
        const { data } = await axios.get(
          `${getAllUsersRoute}/${currentUser._id}`
        );
        setContactList(data);
      }
    };
    run();
  }, [currentUser]);

  const handleChangeChatFunction = (contact) => {
    setCurrentChat(contact);
  };
  return (
    <>
      {currentUser && (
        <Container>
          <div className="green-bg"></div>
          <div className="main-screen">
            <Contacts
              currentUser={currentUser}
              contactList={contactList}
              handleChangeChatFunction={handleChangeChatFunction}
            />
            {currentChat ? (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            ) : (
              <Welcome />
            )}
          </div>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e0dfdc;
  width: 100%;
  height: 100vh;
  .green-bg {
    background-color: #00a884;
    width: 100%;
    height: 10rem;
  }
  .main-screen {
    display: flex;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: -8.5rem;
    background-color: #f0f2f5;
    height: 100%;
  }
`;
export default Chat;
