export default function findPathAstarUtils(start, end, board) {
  let [xStart, yStart] = start;
  let [xEnd, yEnd] = end;

  console.log(xStart, yStart);

  //INIT G(n), H(n) for each cell
  let grid = initGrid(start, end, board);
  let curr = grid[start[0]][start[1]];
  let currNeighbours = [];
  currNeighbours.push(
    grid[xStart + 1][yStart],
    grid[start[0]][start[1] - 1],
    grid[start[0] - 1][start[1]],
    grid[start[0]][start[1] + 1]
  );
  currNeighbours.map((el) => {
    grid[el.xCoordinate][el.yCoordinate].selected = true;
  });
  console.log(grid);
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
