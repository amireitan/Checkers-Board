import React from 'react';
import styled from "@emotion/styled";

const StyledCell = styled("li")`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    height: 100px;
    background: ${({color}) => color};
`;


const StyledSoldier = styled("div")`
    display: inline-block;
    background: ${({color}) => color};
    width: 90%;
    height: 90%;
    border-radius: 100%;
    border: 1px solid #333333;
`;



const BoardCell = ({ cellData, rowIndex, colIndex, soldierColor = "purple" }) => { 
    const { isHasSoldier, color } = cellData;

    return ( 
        <StyledCell color={color} key={`row-${rowIndex}-col-${colIndex}`}>
            {
                isHasSoldier 
                    ? <StyledSoldier color={soldierColor}/>
                    : null
            }
        </StyledCell>
    );
};

export default React.memo(BoardCell);