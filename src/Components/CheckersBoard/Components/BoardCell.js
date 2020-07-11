import React from 'react';
import styled from "@emotion/styled";
import { Emojione } from 'react-emoji-render';

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
    width: 80%;
    height: 80%;
    display: flex;
    font-size: 4em;
    justify-content: center;
    text-align: center;
    align-items: center;
    position: absolute;
`;

const emojiList = [
    "😀","😃","😄","😁","😆","😍","😋","😛","😝","😜","😎","🤗","🤑","🤠","🤡","😈"
];

const getRandomEmoji = (emojisList) => {
    return emojisList[Math.floor(Math.random() * emojisList.length)]
}

const BoardCell = ({ cellData, rowIndex, colIndex, soldierColor = "purple" }) => { 
    const { isSoldier, color } = cellData;

    return ( 
        <StyledCell color={color} key={`row-${rowIndex}-col-${colIndex}`}>
            {
                isSoldier 
                    ? <StyledSoldier><Emojione text={getRandomEmoji(emojiList)} /></StyledSoldier>
                    : null
            }
        </StyledCell>
    );
};

export default React.memo(BoardCell);