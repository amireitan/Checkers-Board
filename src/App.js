import React, { useState } from 'react';
import './App.css';
import SoldierPositionForm from "./Components/SoldierPositionForm/SoldierPositionForm";
import CheckersBoard from "./Components/CheckersBoard/CheckersBoard";
import { Container, Col, Row } from "react-bootstrap";

import styled from "@emotion/styled";

const StyleTitle = styled("h1")`
    font-family: monospace;
    text-shadow: -1px -1px #5a5050;
    font-size: 30px;
    padding: 11px;
    margin: 0px;
`;

const Header = ({ children }) => {
  return (
      <header className="app-header">
        { children }
      </header>
  );
};

const Main = ({ children }) => {
  return (
    <div className="app-main">
      { children }
    </div>
  )
}

const Aside = ({ children }) => {
  return (
    <aside className="app-aside">
        { children }
    </aside>
  )
}

const Content = ({onSoldiersPositionChange, changedSoldierPosition}) => {
  return (
    <div className="app-content">
      <Row>
        <Col sm={12} lg={4}>
          <Aside>
            <SoldierPositionForm  onSoldiersPositionChange={onSoldiersPositionChange}/>
          </Aside>
        </Col>
        <Col sm={12} lg={8}>
          <Main>
            <CheckersBoard changedSoldierPosition={changedSoldierPosition}/>
          </Main>
        </Col>
      </Row>
  </div>
  )
}

function App() {

  const [changedSoldierPosition, setChangedSoldierPosition] = useState({});
  
  const onSoldiersPositionChange = (data) => {
    setChangedSoldierPosition(data.changedSoldierPosition)
  };
  
  return (
    <div  className="app">
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Header>
          <StyleTitle>CHECKERS BOARD</StyleTitle>
        </Header>
        <Content changedSoldierPosition={changedSoldierPosition}
                 onSoldiersPositionChange={onSoldiersPositionChange}
        />
      </Container>
   </div>
  );
}

export default App;
