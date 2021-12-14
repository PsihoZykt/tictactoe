import s from "../../App.module.css";
import {useState} from "react";
import Cell from "../cell/Cell";

let Field = ({winningState, turn, isOver, setHistory, gameState, history, setTurn, setGameState}) => {
    console.log(history)
    let [shapeType, setShapeType] = useState("")
    let chooseShape = (turn) => {
        if (turn % 2 !== 0) {
            return "O"
        } else return "X"
    }
    let getShapeId = (turn) => {
        if (turn % 2  !== 0 ) return 1
        else return -1
    }
    let onFieldClick = (turn, position, shape) => {
        setShapeType(chooseShape(turn))
        setTurn((turn) => turn + 1)
        let newGameState = [...gameState]
        newGameState[position] = getShapeId(turn)
        setGameState(newGameState)
        console.log(newGameState, shape)
        setHistory([...history, {turn: turn, gameState: newGameState}])
    }

    let getCellValueFromGameState = (position) => {
        let getValueFromNumericValue = (numericValue) => {
            if (numericValue === 1) return "X"
            else if (numericValue === -1) return "0"
            else return ""

        }
        let numericValue = gameState[position]
        let value = getValueFromNumericValue(numericValue)
        return value;
    }
    let cellArray = []
    for (let i = 0; i < 9; i++) {
        cellArray.push(<Cell winningCell={winningState?.state?.includes(i) ? winningState : null} isOver={isOver}
                             position={i} shapeType={shapeType}
                             onFieldClick={onFieldClick}
                             turn={turn}
                             setHistory={setHistory}
                             gameState={gameState}
                             history={history}
                             getShapeId={getShapeId}
                             getCellValueFromGameState={getCellValueFromGameState}
            />
        )
    }
    return <>
        <div className={s.wrapper}>
            {cellArray}
        </div>
    </>
}
export default Field