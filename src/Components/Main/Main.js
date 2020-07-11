import React from 'react'
import styled from "@emotion/styled";

const StyledMain = styled("div")`
    background: var(--gray-light);
    color: var(--dark);
    overflow: auto;
`;

const Main = ({ children }) => (
    <StyledMain>
        { children }
    </StyledMain>
);

export default Main;