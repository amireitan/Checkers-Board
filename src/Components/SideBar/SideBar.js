import React from 'react';
import styled from "@emotion/styled";

const StyledSideBar = styled("aside")`
    padding: 23px;
    background: var(--dark);
    height: 100%;
    background: var(--dark);
`;

const SideBar = ({ children }) => (
    <StyledSideBar className="app-aside">
        { children }
    </StyledSideBar>
);

export default SideBar;
  