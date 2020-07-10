import React, { useMemo } from 'react';
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import BoardCell from "./BoardCell";

const StyledRows = styled("div")`
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
