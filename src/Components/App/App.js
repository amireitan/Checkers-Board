import React, { useState } from 'react';
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


const AddRemoveSoldierFromMatrix = ({ 
  boardMatrix, 
  positionState
}) => {

  const { column, row, isSoldier } = positionState;

  const mapRowCells = data => data.map((cell, index) => {
      return (column === index) 
          ? { ...cell, isSoldier }
          : cell
  });

  return boardMatrix.map((matrixRow, index) => {
      return (index === row) 
          ? mapRowCells(matrixRow)
          : matrixRow;
  });
};


/***************************************
 *          Soldiers Position
 ***************************************/

const getPositionTemplate = ({ row, column }) => `${row}-${column}`;

const modifySoldiersPosition = ({ 
  positionState: { column, row, isSoldier },
  soldiersPosition
}) => {
  const soldierPositionKeys = Object.keys(soldiersPosition);
  const newPositionKey = getPositionTemplate({column, row});

  if (isSoldier) return ({ ...soldiersPosition, [newPositionKey]: [row, column] });


  return soldierPositionKeys.reduce((prev, key) => {
      if (key !== newPositionKey) {
        prev[key] = soldiersPosition[key];
      }
      return prev;
  }, {});
};

/******************************************
 *         General Validations
 *****************************************/

const GENERAL_VALIDATIONS = {
  soldierAlreadyExists: {
      errorTerm: ({position, isAdd, soldiersPosition}) => 
        isAdd && !!soldiersPosition[getPositionTemplate(position)],
      errorMessage: "Soldier already exists..."
  },
  soldierNotExists: { 
      errorTerm: ({position, isAdd, soldiersPosition}) => 
        !isAdd && !soldiersPosition[getPositionTemplate(position)],
      errorMessage: "Soldier not exists..."
  },
  numberOfSoldiers: {
    errorTerm: ({isAdd, totalSoldiers}) => totalSoldiers < 0 || totalSoldiers > 22, 
    errorMessage: "There should be 0-22 soldiers on board"
  }
};

const checkForGeneralValidationErrors = ({ 
  isAdd, 
  soldiersPosition, 
  position 
}) => {
  const totalSoldiers = Object.keys(soldiersPosition).length;

  return Object.keys(GENERAL_VALIDATIONS).reduce((prev, ruleKey) => {

      const validationRule = GENERAL_VALIDATIONS[ruleKey];

      const data = { 
        position, 
        isAdd, 
        soldiersPosition, 
        totalSoldiers: isAdd ? totalSoldiers + 1 : totalSoldiers 
      };

      if (validationRule.errorTerm(data)) {
        prev.push(validationRule.errorMessage);
      }
      
      return prev;
  }, []);
};


/***************************************
 *                App
 ***************************************/
const defaultMatrix = CreateDefaultMatrix({});

const App = () => {
  const [{ boardMatrix, soldiersPosition }, setCheckersBoardState] = useState({
    boardMatrix: defaultMatrix,
    soldiersPosition: {}
  });

  const onSoldiersPositionChange = (positionState) => { 
    const newSoldiersPosition = modifySoldiersPosition({ 
      positionState, 
      soldiersPosition
    });

    const newMatrixData = AddRemoveSoldierFromMatrix({ 
      boardMatrix, 
      positionState 
    });

    setCheckersBoardState({
      boardMatrix: newMatrixData,
      soldiersPosition: newSoldiersPosition
    });
  };

  const handleCheckForGeneralErrors = ({ position, isAdd }) => {

    return checkForGeneralValidationErrors({ 
      position, 
      isAdd, 
      soldiersPosition,
    })
  }

  return (
    <StyledApp>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Header/>
        <Content onSoldiersPositionChange={onSoldiersPositionChange}
                 boardMatrix={boardMatrix}
                 checkForGeneralValidationErrors={handleCheckForGeneralErrors}
        />
      </Container>
   </StyledApp>
  );
}

export default App;
