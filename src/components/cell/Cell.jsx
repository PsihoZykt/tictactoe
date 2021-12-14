import s from "../../App.module.css";
import {useState} from "react";

let Cell = ({
                winningCell,
                shapeType,
                onFieldClick,
                turn,
                position,
                isOver,
                getCellValueFromGameState
            }) => {
    let classes = s.cell

    if (winningCell && winningCell.style === "left-diagonal") {
        classes = classes + " " + s.leftDiagonalCrossing
    } else if (winningCell && winningCell.style === "right-diagonal") {
        classes = classes + " " + s.rightDiagonalCrossing

    } else if (winningCell && winningCell.style === "horizontal") {
        classes = classes + " " + s.horizontalCrossing

    } else if (winningCell && winningCell.style === "vertical") {
        classes = classes + " " + s.verticalCrossing

    }
    let onCellClick = () => {
        if (!isOver && !getCellValueFromGameState(position)) {
            onFieldClick(turn + 1, position, shapeType)
        }
    }
    return <div className={classes} onClick={onCellClick}>
        <span className={s.cellValue}> {getCellValueFromGameState(position)}</span>
    </div>
}
export default Cell