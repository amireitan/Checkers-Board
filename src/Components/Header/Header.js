import React from 'react';
import styled from "@emotion/styled";

const StyledHeader = styled("div")`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    justify-content: center;
    z-index: 999;
    padding: 0 50px;
    display: flex;
    align-items: center;
    background: var(--gray-dark);
    text-align: center;
    box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.75);
`;

const StyleTitle = styled("h1")`
    font-family: monospace;
    text-shadow: -1px -1px #5a5050;
    font-size: 30px;
    padding: 11px;
    margin: 0px;
`;

const Header = ({ children }) => (
    <StyledHeader>
        <StyleTitle>CHECKERS BOARD</StyleTitle>
    </StyledHeader>
);

export default Header;
  