function drawSquare(r, c, color){
    ctx.fillStyle = color;
    ctx.fillRect(c*BS, r*BS, BS, BS);

    ctx.strokeStyle = "gray";
    ctx.strokeRect(c*BS, r*BS, BS, BS);
}

function drawBoard(){
    for(let i = 1; i < ROW; ++i){
        for(let j = 0; j < COL; ++j){
            this.drawSquare(i, j, board[i][j]);
        }
    }

    //outline
    ctx.strokeStyle = "gray";
    ctx.strokeRect(0, 20, 200, 400);
}

drawBoard();

//unbiased shuffle algorithm. Fisher-Yates Shuffle.
function shuffle(batch){
    var curIndex = batch.length;

    while (0 !== curIndex) {
        var rand = Math.floor(Math.random() * curIndex);
        curIndex -= 1;

        var temp = batch[curIndex];
        batch[curIndex] = batch[rand];
        batch[rand] = temp;
    }

    return batch;
}

function genNewBatch(){
    let temp = [0, 1, 2, 3, 4, 5, 6];
    shuffle(temp);
    for(let i = 0; i < 7; ++i){
        nextP.push(PIECES[temp[i]]);
    }
}

genNewBatch();

curP = new Piece(nextP[0][0], nextP[0][1]);
nextP.shift();

function getNewPiece(){
    let toDel = curP;
    curP = new Piece(nextP[0][0], nextP[0][1]);
    nextP.shift();
    delete toDel;
    if(nextP.length() < 5){
        genNewBatch();
    }
}

curP.drawPiece();
curP.erasePiece();
curP.y = curP.y + 1;
curP.drawPiece();
//curP.drop();