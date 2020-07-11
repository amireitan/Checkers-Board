import React, { useState, useEffect } from 'react';
import Board, { CreateDefaultMatrix,  AddRemoveSoldierFromBoard} from "./Components/Board";
import { BoardTitle } from "./Components/BoardTitle";

const defaultMatrix = CreateDefaultMatrix({
    // colorPalette: ["green", "yellow"]
});


const CheckersBoard = ({ matrix = defaultMatrix, changedSoldierPosition }) => {

    const [matrixBoard, setMatrixBoard] = useState(matrix);
    
    useEffect(() => {
        if (!changedSoldierPosition) return;

        const newMatrixData = AddRemoveSoldierFromBoard({matrixBoard, changedSoldierPosition})

        setMatrixBoard(newMatrixData)

    }, [changedSoldierPosition])
    
    return (
        <>  
            <Board 
                data={matrixBoard}
                soldierColor={"#af0516"}
            />
        </>
    )
};

export default CheckersBoard;