export default function findPathAstarUtils(start, end, board) {
  //INIT G(n), H(n) for each cell
  console.log(2222);
  let grid = initGrid(start, end, board);
  let curr = grid[(start[0], end[0])];
  let currNeighbours = [];
  return grid;
}

const initGrid = (start, end, board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j].Hn =
        Math.abs(board[i][j].xCoordinate - end[0]) +
        Math.abs(board[i][j].yCoordinate - end[1]);

      //console.log(board[i][j]);
    }
  }

  return board;
};
