import React from "react";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #00a884;
  }
`;

export default Logout;
