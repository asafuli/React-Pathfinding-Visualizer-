export default function findPathAstarUtils(start, end, board) {
  let [rowStart, colStart] = start;
  let [rowEnd, colEnd] = end;

  //INIT G(n), H(n) for each cell
  let grid = initGrid(start, end, board);

  let opened = [];
  let closed = [];
  let gridColumn, gridRow, curr;

  opened.push(grid[rowStart][colStart]);
  opened[0].parent = 

  while(opened.length > 0){

    curr = opened.shift();
    if 
    ({gridColumn, gridRow}  = curr);
    let currNeighbours = [];
    currNeighbours.push(
      grid[gridRow + 1][gridColumn],
      grid[gridRow][gridColumn - 1],
      grid[gridRow - 1][gridColumn],
      grid[gridRow][gridColumn + 1]
    );
    
    

  }

    
  currNeighbours.map((el) => {
    grid[el.gridRow][el.gridColumn].selected = true;
  });
  return grid;
}

const initGrid = ([rowStart, colStart], [rowEnd, colEnd], board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j].Hn =
        Math.abs(board[i][j].gridRow - rowEnd) +
        Math.abs(board[i][j].gridColumn - colEnd);

      //console.log(board[i][j]);
    }
  }

  return board;
};
