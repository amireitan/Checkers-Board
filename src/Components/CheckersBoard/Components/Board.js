
import React from 'react';
import styled from "@emotion/styled";
import BoardRow from "./BoardRow";

const StyledBoard = styled("ul")`
    width: 100%;
    height: 100%;
    padding: 23px;
    border: 1px solid #5f5f5f;
    background: #181a1d;
`;

const CHEKERS_BOARD = {
    rows: 8,
    columns: 8
}; 

export const CreateDefaultMatrix = ({
    matrix = [], 
    colorPalette = ["black", "white"]
}) => {
    
    const getColor = (rowInd, colInd) => (rowInd + colInd) % 2 === 0 ? colorPalette[0] : colorPalette[1];

    for (let rowIndx = 0; rowIndx < CHEKERS_BOARD.rows; rowIndx++) {
        matrix[rowIndx] = [];

        for (let colIndx = 0; colIndx < CHEKERS_BOARD.columns; colIndx++) {
            console.log(`[${rowIndx}, ${colIndx}]: ${getColor(rowIndx, colIndx)}`);

            matrix[rowIndx][colIndx] = { isHasSoldier: false, color: getColor(rowIndx, colIndx) };
        }
    };

    return matrix;
};


export const AddRemoveSoldierFromBoard = ({matrixBoard, changedSoldierPosition}) => {
    const { column, row, isAdd } = changedSoldierPosition;

    const mapRowCells = data => data.map((cell, index) => {
        return (column === index) 
            ? { ...cell, isHasSoldier: isAdd }
            : cell
    });

    return matrixBoard.map((matrixRow, index) => {
        return (index === row) 
            ? mapRowCells(matrixRow)
            : matrixRow;
    });
};


const Board = ({ data, soldierColor, colorPalette }) => {
    return (
        <StyledBoard style={{width: "100%", height: "100%"}}>
            { data.map((rowData, index) => {
                    return (
                        <li key={`row-${index}`}>
                            <BoardRow 
                                rowData={rowData} 
                                rowIndex={index}
                                soldierColor={soldierColor}
                            /> 
                        </li>  
                    )
                })
            }
        </StyledBoard>
    )
};

export default Board;