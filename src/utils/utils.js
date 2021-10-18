export default function findPathAstarUtils(start, end, board) {
  let [rowStart, colStart] = start;
  let [rowEnd, colEnd] = end;

  //INIT G(n), H(n) for each cell
  let grid = initGrid(start, end, board);

  let opened = [];
  let visited = [];
  let closed = [];
  let currNeighbours = [];
  let gridColumn, gridRow, curr;

  opened.push(grid[rowStart][colStart]);
  visited.push(grid[rowStart][colStart]);

  opened[0].parent = opened[0];
  opened[0].Gn = 0;
  opened[0].Fn = opened[0].Gn + opened[0].Hn;

  while (opened.length > 0) {
    curr = opened.shift();
    if (curr.gridRow === rowEnd && curr.gridColumn === colEnd) {
      console.log('FOUND PATH', curr);
      break;
    }

    ({ gridColumn, gridRow } = curr);

    currNeighbours.push(
      gridRow + 1 <= board.length && grid[gridRow + 1][gridColumn],
      gridColumn > 0 && grid[gridRow][gridColumn - 1],
      gridRow > 0 && grid[gridRow - 1][gridColumn],
      gridColumn + 1 <= board[0].length && grid[gridRow][gridColumn + 1]
    );

    currNeighbours.map((el) => {
      if (el === false || typeof el == 'undefined' || closed.includes(el))
        return;
      // Calculate Gn for all Neighbours
      el.Gn =
        curr.Gn +
        Math.abs(curr.gridRow - el.gridRow) +
        Math.abs(curr.gridColumn - el.gridColumn);
      el.Fn = el.Gn + el.Hn;

      el.parent = curr;

      //Add all curr neighbours to opened list
      if (!opened.includes(el)) opened.push(el);

      if (!visited.includes(el)) visited.push(el);

      //el.selected = true;
    });

    opened.sort((n1, n2) => n1.Fn - n2.Fn);
    closed.push(curr);

    //visited.map((el) => (el.visited = true));
    //Cleanup
    currNeighbours.splice(0, currNeighbours.length);
  }

  let parent = grid[rowEnd][colEnd].parent;
  let path = [];
  while (parent !== grid[rowStart][colStart]) {
    path.push(parent);
    parent.selected = true;
    parent = parent.parent;
  }
  return { grid, visited };
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
