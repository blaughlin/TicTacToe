const canvas = document.getElementById('myCanvas')

function collides(rects, x, y){
    let isCollision = false;
    for(let i=0; i < rects.length; i++){
        const left = rects[i].x, right = rects[i].x + rects[i].width
        const top = rects[i].y, bottom = rects[i].y + rects[i].height
        if (right >= x && left <=x && bottom >=y && top <=y ){
            isCollision = rects[i]
        }
    }
    return isCollision
}

// check if context exists
if (canvas && canvas.getContext){
    const rects=[{x:0, y:0, width:50, height:50}, {x:60, y:0, width:50, height:50}, {x:120, y:0, width:50, height:50},
                 {x:0, y:60, width:50, height:50}, {x:60, y:60, width:50, height:50}, {x:120, y:60, width:50, height:50},
                 {x:0, y:120, width:50, height:50}, {x:60, y:120, width:50, height:50}, {x:120, y:120, width:50, height:50}]
    const context = canvas.getContext('2d')
    if (context){
        for(let i=0; i < rects.length; i++){
            context.fillStyle = 'white'
            context.fillRect(rects[i].x, rects[i].y, rects[i].width, rects[i].height)
        } 
        context.fillStyle = 'black'
        context.fillRect(0, 50, 170, 10)
        context.fillRect(0, 110, 170, 10)
        context.fillRect(50, 0, 10, 170)
        context.fillRect(110, 0, 10, 170)
    }

    // listener
    canvas.addEventListener('click', function(e) {
        const rect = collides(rects, e.offsetX, e.offsetY)
        if (rect){
            console.log(rects.indexOf(rect))
        } else {
            console.log('no collision')
        }
    }, false)
}

const X = 'X'
const O = 'O'

let moves = 0

function initial_state() {
    // Returns starting state of board
    return [['EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY']]
}

const myBoard = [['O', 'O', 'O'],
                 ['O', 'X', 'O'],
                 ['X', 'X', 'X']]

function player(board) {
    // returns player who has the next turn on a board
    const x_count = board.reduce(function(a,b) { return a.concat(b) }).filter(player => player === X).length 
    const o_count = board.reduce(function(a,b) { return a.concat(b) }).filter(player => player === O).length 

    if (x_count === 0 && o_count === 0){
        return X
    }
    else if (x_count > o_count) {
        return O
    } else {
        return X
    }
}

function actions(board) {
    // returns ser of all possible actions (i, j) available on the board
    const moves = []
    for (let i=0; i < 3; i++){
        for (let j=0; j < 3; j++){
            if (board[i][j] == 'EMPTY'){
                moves.push([i,j])
            }
        }
    }
    return moves
}

function result(board, action) {
    // returns the board that results from making move (i, j) on the board
    const newBoard = [...board]
    newBoard[action[0]][action[1]] = player(board)
    return newBoard
}

function resultOppositePlayer(board, action) {
    // returns the board that results from making move (i, j) on the board
    if (player(board) === X){
        let current_player = O
    } else {
        current_player = X
    }
    const newBoard = [...board]
    newBoard[action[0]][action[1]] = current_player
    return newBoard
}

const emptyBoard = initial_state()
console.log(emptyBoard)
let newBoard = result(emptyBoard, [0,0])
console.log(newBoard)
