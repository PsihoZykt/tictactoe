import s from './App.module.css'
import {useEffect, useState} from "react";
import Field from "./components/field/Field";
import History from "./components/history/History";
import gameOverHandler from "./util/gameOverHandler";


let App = () => {
    let [turn, setTurn] = useState(0)
    let [history, setHistory] = useState([{turn: 0, gameState: [0, 0, 0, 0, 0, 0, 0, 0]}])
    let [gameState, setGameState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    let [isOver, setIsOver] = useState(false)
    let [winningState, setWinningState] = useState({})


    useEffect(() => {
            if (gameOverHandler(gameState).isGameOver) {
                endGame(gameOverHandler(gameState).gameOverType)
            }
        }, [gameState]
    )


    let endGame = (winningState) => {
        setWinningState(winningState)
        setIsOver(true)
    }
    let onStartNewGame = () => {
        setGameState([0, 0, 0, 0, 0, 0, 0, 0, 0])
        setTurn(0)
        setWinningState({})
        setIsOver(false)
    }
    return (
        <div>
            <Field winningState={winningState} isOver={isOver} history={history} gameState={gameState}
                   setHistory={setHistory} turn={turn} setTurn={setTurn} setGameState={setGameState}/>
            <input type="button" value="Start new game" onClick={onStartNewGame}/>
            <History setGameState={setGameState} history={history} setTurn={setTurn} setWinningState={setWinningState}
                     setIsOver={setIsOver}/>
            {isOver ? <div> Game is over </div> : null}
        </div>
    )
}
export default App
