import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SendChat from "./SendChat";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    const run = async () => {
      if (currentChat) {
        const { data } = await axios.post(`${getAllMessagesRoute}`, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(data);
      }
    };
    run();
  }, [currentChat]);

  const handleSendChat = async (msg) => {
    const { data } = await axios.post(`${sendMessageRoute}`, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];

    msgs.push({
      fromSelf: true,
      message: msg,
    });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <Container>
      <div className="chat-header">
        <div className="chat-detail">
          <img src={currentChat.profilePic} alt="error" />
          <span>{currentChat.username}</span>
        </div>
      </div>
      <div className="message-container">
        {messages.length > 0 &&
          messages.map((msg) => (
            <div
              ref={scrollRef}
              className={`message ${msg.fromSelf ? "sender" : "reciver"}`}
              key={uuidv4}
            >
              <div className="content">{msg.message}</div>
            </div>
          ))}
      </div>
      <SendChat handleSendChat={handleSendChat} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 75%;
  color: #131d2f;
  overflow: none;
  .chat-header {
    display: flex;
    justify-content: flex-start;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    align-items: center;
    background-color: #f0f2f5;
    .chat-detail {
      display: flex;
      align-items: center;
      gap: 2rem;
      img {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
      }
    }
  }
  .message-container {
    background-color: #efeae2;
    height: 82vh;
    overflow: auto;
    &::-webkit-scrollbar {
      color: #c3c1bc;
      width: 0.2rem;
      height: 10px;
      &-thumb {
        background-color: #ced0d1;
      }
    }
    .message {
      display: flex;
      align-items: center;
      margin-top: 0.4rem;
      margin-left: 6rem;
      margin-right: 6rem;
      margin-bottom: 0.2rem;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.8rem;
        font-size: 1rem;
        border-radius: 0.4rem;
        background-color: white;
      }
    }
    .reciver {
      display: flex;
      justify-content: flex-start;
      .content {
        background-color: white;
      }
    }
    .sender {
      display: flex;
      justify-content: flex-end;
      .content {
        background-color: #d9fdd3;
      }
    }
  }
`;

export default ChatContainer;
