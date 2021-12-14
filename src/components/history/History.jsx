let History = (props) => {
    let arr = props.history.map(el => <div onClick={() => {
        console.log(el.turn)
        props.setGameState(el.gameState)
        props.setTurn(el.turn)
        props.setWinningState({})
        props.setIsOver(false)
    }}> {el.turn} </div>)
    return arr
}
export default History