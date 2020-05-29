const ROW = 21;
const COL = 10;
const BS = 20;  //block size
const ctx = document.getElementById("game").getContext("2d");
const speed = 1000;

//empty board
let board = [];
for(let i = 0; i < ROW; ++i){
    board[i] = [];
    for(let j = 0; j < COL; ++j){
        //empty spaces
        board[i][j] = "black";
    }
}

const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];

const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"purple"],
    [O,"yellow"],
    [L,"orange"],
    [I,"cyan"],
    [J,"blue"]
];

let nextP = [];
let curP;

function checkCollision(x, y, pattern){
    if(x < 0 || x >= COL || y >= ROW){
        return true;
    }
    for(let r = 0; r < pattern.length; ++r){
        for(let c = 0; c < pattern[r].length; ++c){
            if(pattern[r][c]){
                if(board[y + r][x + c] != "black"){
                    return true;
                }
            }
        }
    }
    return false;
}

class Piece{
    constructor(squares, color){
        this.squares = squares;
        this.color = color;
        this.pattern = squares[0];
        this.num = 0;
        this.x = 3;
        this.y = 0;
    }
    drawPiece(){
        for(let r = 0; r < this.pattern.length; ++r){
            for(let c = 0; c < this.pattern[r].length; ++c){
                if(this.pattern[r][c]){
                    drawSquare(this.y + r, this.x + c, this.color);
                }
            }
        }
        checkCollision(this.x, this.y, this.pattern);
    }
    erasePiece(){
        for(let r = 0; r < 3; ++r){
            for(let c = 0; c < 3; ++c){
                if(this.pattern[r][c]){
                    drawSquare(this.y + r, this.x + c, "black");
                }
            }
        }
    }
    //once piece can't go down anymore
    stop(){
        //TODO
    }

    moveLeft(){
        if(!checkCollision(this.x-1, this.y, this.pattern)){
            this.erasePiece();
            this.x = this.x - 1;
            this.drawPiece();
        }
    }
    moveRight(){
        if(!checkCollision(this.x+1, this.y, this.pattern)){
            this.erasePiece();
            this.x = this.x + 1;
            this.drawPiece();
        }
    }
    softDrop(){
        if(!checkCollision(this.x, this.y+1, this.pattern)){
            this.erasePiece();
            this.y = this.y + 1;
            this.drawPiece();
        }
    }
    hardDrop(){
        //TODO
    }

    drop(){
        if(!checkCollision(this.x, this.y+1, this.pattern)){
            this.erasePiece();
            this.y = this.y + 1;
            this.drawPiece();
        }
        else{
            clearInterval(this.dropInt);
        }
    }
}