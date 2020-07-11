import React from 'react';
import styled from "@emotion/styled";
import BoardRow from "./Components/BoardRow";

const StyledBoard = styled("ul")`
    width: 100%;
    height: 100%;
    padding: 23px;
    border: 1px solid #5f5f5f;
    background: #181a1d;
`;

const CheckersBoard = ({ boardMatrix }) => {
    
    return (
        <StyledBoard style={{width: "100%", height: "100%"}}>
            { boardMatrix.map((rowData, index) => {
                    return (
                        <li key={`row-${index}`}>
                            <BoardRow 
                                rowData={rowData} 
                                rowIndex={index}
                                soldierColor={"#af0516"}
                            /> 
                        </li>  
                    )
                })
            }
        </StyledBoard>
    );
};

export default CheckersBoard;