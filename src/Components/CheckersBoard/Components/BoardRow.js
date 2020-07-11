import React from 'react';
import styled from "@emotion/styled";

import BoardCell from "./BoardCell";

const StyledRows = styled("ul")`
    display: flex;
    flex-direction: row;
    background: ${({color}) => color};
`;

const BoardRow = ({ rowData, rowIndex, soldierColor }) => {
    return (
        <StyledRows> 
            { 
                rowData.map((cellData, colIndex) => {
                    return <BoardCell 
                                cellData={cellData} 
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                soldierColor={soldierColor}
                            />
                })
            } 
        </StyledRows>
    );
};

export default BoardRow;
