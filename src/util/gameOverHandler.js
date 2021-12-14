let gameOverHandler = (gameState) => {

    if (Math.abs(gameState[0] + gameState[1] + gameState[2]) === 3) {
       return {isGameOver: true, gameOverType: {style: "horizontal", state: [0, 1, 2]}, }
    } else if (Math.abs(gameState[3] + gameState[4] + gameState[5]) === 3) {
       return {isGameOver: true, gameOverType: {style: "horizontal", state: [3, 4, 5]}}
    } else if (Math.abs(gameState[6] + gameState[7] + gameState[8]) === 3) {
        return {isGameOver: true, gameOverType: {style: "horizontal", state: [6, 7, 8]}}
    } else if (Math.abs(gameState[0] + gameState[4] + gameState[8]) === 3) {
        return {isGameOver: true, gameOverType: {style: "left-diagonal", state: [0, 4, 8]}}
    } else if (Math.abs(gameState[2] + gameState[4] + gameState[6]) === 3) {
        return {isGameOver: true, gameOverType: {style: "right-diagonal", state: [2, 4, 6]}}
    } else if (Math.abs(gameState[0] + gameState[3] + gameState[6]) === 3) {
        return {isGameOver: true, gameOverType: {style: "vertical", state: [0, 3, 6]}}
    } else if (Math.abs(gameState[1] + gameState[4] + gameState[7]) === 3) {
        return {isGameOver: true, gameOverType: {style: "vertical", state: [1, 4, 7]}}
    } else if (Math.abs(gameState[2] + gameState[5] + gameState[8]) === 3) {
        return {isGameOver: true, gameOverType: {style: "vertical", state: [2, 5, 8]}}
    } else if (!gameState.includes(0)) {
        return {isGameOver: true, gameOverType: {style: "no-moves", state: gameState}}
    }
    return {isGameOver: false}
}

export default gameOverHandler