import React from 'react';
import { Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import Main from "../Main/Main";
import SideBar from "../SideBar/SideBar";
import SoldierPositionForm from "../SoldierPositionForm/SoldierPositionForm";
import CheckersBoard from "../CheckersBoard/CheckersBoard";


const StyledContent = styled("div")`
  position: relative;
  top: 57px;
  height: 100%;
  background: var(--dark);
`;

const Content = ({
    onSoldiersPositionChange, 
    changedSoldierPosition,
    boardMatrix = [],
    checkForGeneralValidationErrors
}) => {
    return (
        <StyledContent>
            <Row>
            <Col sm={12} lg={4}>
                <SideBar>
                <SoldierPositionForm  
                    onSoldiersPositionChange={onSoldiersPositionChange}
                    checkForGeneralValidationErrors={checkForGeneralValidationErrors}
                />
                </SideBar>
            </Col>
            <Col sm={12} lg={8}>
                <Main>
                    <CheckersBoard 
                        changedSoldierPosition={changedSoldierPosition}
                        boardMatrix={boardMatrix}
                    />
                </Main>
            </Col>
            </Row>
        </StyledContent>
    );
};

export default Content;