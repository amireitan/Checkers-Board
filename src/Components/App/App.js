import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import Content from "../Content/Content";
import styled from "@emotion/styled";
import './App.css';

const StyledApp = styled("div")`
  height: 100%;
  min-height: 100vh;
  background: #e8eef3;
  display: flex;
  color: #fff;
`;

/***************************************
 *           Matrix Logic
 ***************************************/
const CHEKERS_BOARD = {
  rows: 8,
  columns: 8
}; 

const CreateDefaultMatrix = ({
  matrix = [], 
  colorPalette = ["black", "white"]
}) => {
  
  const getColor = (rowInd, colInd) => (rowInd + colInd) % 2 === 0 ? colorPalette[0] : colorPalette[1];

  for (let rowIndx = 0; rowIndx < CHEKERS_BOARD.rows; rowIndx++) {
      matrix[rowIndx] = [];

      for (let colIndx = 0; colIndx < CHEKERS_BOARD.columns; colIndx++) {
          console.log(`[${rowIndx}, ${colIndx}]: ${getColor(rowIndx, colIndx)}`);

          matrix[rowIndx][colIndx] = { isSoldier: false, color: getColor(rowIndx, colIndx) };
      }
  };

  return matrix;
};


const AddRemoveSoldierFromBoard = ({ 
  boardMatrix, 
  changedSoldierPosition
}) => {

  const { column, row, isAdd } = changedSoldierPosition;

  const mapRowCells = data => data.map((cell, index) => {
      return (column === index) 
          ? { ...cell, isSoldier: isAdd }
          : cell
  });

  return boardMatrix.map((matrixRow, index) => {
      return (index === row) 
          ? mapRowCells(matrixRow)
          : matrixRow;
  });
};


/***************************************
 *                App
 ***************************************/
const defaultMatrix = CreateDefaultMatrix({});

const App = () => {
  const [changedSoldierPosition, setChangedSoldierPosition] = useState({});
  const [boardMatrix, setBoardMatrix] = useState(defaultMatrix);

  const onSoldiersPositionChange = (data) => {
    setChangedSoldierPosition(data.changedSoldierPosition)
  };

  useEffect(() => {
    if (!changedSoldierPosition) return;

    const newMatrixData = AddRemoveSoldierFromBoard({ boardMatrix, changedSoldierPosition })

    setBoardMatrix(newMatrixData)

  }, [changedSoldierPosition])
  
  return (
    <StyledApp>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Header/>
        <Content changedSoldierPosition={changedSoldierPosition}
                 onSoldiersPositionChange={onSoldiersPositionChange}
                 boardMatrix={boardMatrix}
        />
      </Container>
   </StyledApp>
  );
}

export default App;
