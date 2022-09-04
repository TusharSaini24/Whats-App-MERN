import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import Logout from "./Logout";
const Contacts = ({ currentUser, contactList, handleChangeChatFunction }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const searchChats = useRef();
  // const handeSearchContact = async() => {
  //   const searchContent = searchChats.current.value;
  //   const {data} = await axios.get()
  // };
  return (
    <Container>
      <div className="header">
        <img src={currentUser.profilePic} alt="error" />
        <Logout />
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search or start new chat "
          ref={searchChats}
          // onChange={handeSearchContact}
        />
      </div>
      <div className="contacts-container">
        {contactList.map((contact, index) => (
          <div
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            key={index}
            onClick={() => {
              setCurrentSelected(index);
              handleChangeChatFunction(contact);
            }}
          >
            <img src={contact.profilePic} alt="error" />
            <span>{contact.username}</span>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  width: 35%;
  color: #131d2f;
  overflow: hidden;
  .header {
    display: flex;
    justify-content: space-between;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    align-items: center;
    img {
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
    }
  }
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;

    input {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      background-color: #f0f2f5;
      text-align: center;
      width: 95%;
      font-size: 1rem;
      border: none;
      border-radius: 0.4rem;
      &:focus {
        outline: none;
      }
    }
  }
  .contacts-container {
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.2rem;
    padding-bottom: 0.4rem;
    flex-direction: column;
    gap: 0.1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      height: 10px;
      background-color: white;
      &-thumb {
        background-color: #ced0d1;
      }
    }
    .contact {
      display: flex;
      width: 100%;
      background-color: white;
      align-items: center;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 0.6rem;
      gap: 1rem;
      cursor: pointer;
      &:hover {
        background-color: #f0f2f5;
      }
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
      }
      span {
        text-transform: capitalize;
      }
    }
    .selected {
      background-color: #f0f2f5;
    }
  }
`;
export default Contacts;
