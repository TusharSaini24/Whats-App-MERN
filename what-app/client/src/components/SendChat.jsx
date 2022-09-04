import React, { useState } from "react";
import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
const SendChat = ({ handleSendChat }) => {
  const [message, setMessage] = useState("");
  const [emojiHideAndShow, setEmojiHideAndShow] = useState(false);

  const handleAddEmoji = (e, emojiObj) => {
    const msg = message + emojiObj.emoji;
    setMessage(msg);
    setEmojiHideAndShow(false);
  };

  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSendChat(message);
      setMessage("");
    }
  };
  return (
    <Container>
      <div className="emoji-picker">
        <BsEmojiSmileFill
          onClick={() => setEmojiHideAndShow(!emojiHideAndShow)}
        />
        {emojiHideAndShow && <Picker onEmojiClick={handleAddEmoji} />}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #f0f2f5;
  gap: 2rem;
  padding-left: 2rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  align-items: center;

  .emoji-picker {
    display: flex;
    align-items: center;
    height: 2rem;
    svg {
      font-size: 2rem;
      color: #c3c9cf;
    }
    cursor: pointer;
    .emoji-picker-react {
      position: absolute;
      top: 23rem;
      left: 30.8rem;
      width: 67vw;
      background-color: #f0f2f4;
      transition: width 2s linear 1s;
    }
  }
  .input-container {
    display: flex;
    align-items: center;
    width: 90%;
    input {
      width: 100%;
      padding: 1rem 1rem;
      border-radius: 0.7rem;
      border: none;
      &:focus {
        outline: none;
      }
      font-size: 1rem;
      text-transform: capitalize;
    }
  }
`;
export default SendChat;
