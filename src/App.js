import s from './App.module.css'
import {useEffect, useState} from "react";

let History = (props) => {
    let arr = props.history.map(el => <div onClick={() => {
        console.log(el.turn)
        props.setGameState(el.gameState)
        props.setTurn(el.turn)
    }}> {el.turn} </div>)
    return arr
}

let App = () => {
    let [turn, setTurn] = useState(0)
    let [history, setHistory] = useState([{turn: 0, gameState: [0, 0, 0, 0, 0, 0, 0, 0]}])
    let [gameState, setGameState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    let [isOver, setIsOver] = useState(false)
    let [winningState, setWinningState] = useState({})


    useEffect(() => {
            if (Math.abs(gameState[0] + gameState[1] + gameState[2]) === 3) {
                endGame({style: "horizontal", state: [0, 1, 2]})
            } else if (Math.abs(gameState[3] + gameState[4] + gameState[5]) === 3) {
                endGame({style: "horizontal", state: [3, 4, 5]})
            } else if (Math.abs(gameState[6] + gameState[7] + gameState[8]) === 3) {
                endGame({style: "horizontal", state: [6, 7, 8]})
            } else if (Math.abs(gameState[0] + gameState[4] + gameState[8]) === 3) {
                endGame({style: "left-diagonal", state: [0, 4, 8]})
            } else if (Math.abs(gameState[2] + gameState[4] + gameState[6]) === 3) {
                endGame({style: "right-diagonal", state: [2, 4, 6]})
            } else if (Math.abs(gameState[0] + gameState[3] + gameState[6]) === 3) {
                endGame({style: "vertical", state: [0, 3, 6]})
            } else if (Math.abs(gameState[1] + gameState[4] + gameState[7]) === 3) {
                endGame({style: "vertical", state: [1, 4, 7]})
            } else if (Math.abs(gameState[2] + gameState[5] + gameState[8]) === 3) {
                endGame({style: "vertical", state: [2, 5, 8]})
            } else if (!gameState.includes(0)) {
                endGame({style: "no-moves", state: gameState})
            }

        }, [gameState]
    )


    let endGame = (winningState) => {
        setWinningState(winningState)
        setIsOver(true)
        console.log("game over")
    }

    return (
        <div>
            <Field winningState={winningState} isOver={isOver} history={history} gameState={gameState}
                   setHistory={setHistory} turn={turn} setTurn={setTurn} setGameState={setGameState}/>
            <History setGameState={setGameState} history={history} setTurn={setTurn}/>
            {isOver ? <div> Game is over </div> : null}
        </div>
    )
}
export default App
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
let Cell = ({
                winningCell,
                shapeType,
                onFieldClick,
                turn,
                position,
                isOver,
                getCellValueFromGameState
            }) => {
    let [cellValue, setCellValue] = useState("")
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
