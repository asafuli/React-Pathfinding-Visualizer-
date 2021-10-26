export default function findPathAstarUtils(start, end, board) {
  let [rowStart, colStart] = start;
  let [rowEnd, colEnd] = end;

  //INIT G(n), H(n) for each cell
  let grid = initGrid(start, end, board);
  let foundPath = false;
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
    if (!visited.includes(curr)) visited.push(curr);

    if (curr.gridRow === rowEnd && curr.gridColumn === colEnd) {
      console.log('FOUND PATH', curr);
      foundPath = true;
      break;
    }

    ({ gridColumn, gridRow } = curr);

    // Allowing only up down left right
    currNeighbours.push(
      gridRow + 1 <= board.length && grid[gridRow + 1][gridColumn],
      gridColumn > 0 && grid[gridRow][gridColumn - 1],
      gridRow > 0 && grid[gridRow - 1][gridColumn],
      gridColumn + 1 <= board[0].length && grid[gridRow][gridColumn + 1]
    );

    // TODO -- Allowing also diagonal - Use Chebyshev distance.
    // currNeighbours.push(
    //   gridRow + 1 <= board.length &&
    //     gridColumn + 1 <= board[0].length &&
    //     grid[gridRow + 1][gridColumn + 1],
    //   gridColumn > 0 &&
    //     gridRow + 1 <= board.length &&
    //     grid[gridRow + 1][gridColumn - 1],
    //   gridRow > 0 &&
    //     gridColumn + 1 <= board[0].length &&
    //     grid[gridRow - 1][gridColumn + 1],
    //   gridColumn > 0 && gridRow > 0 && grid[gridRow - 1][gridColumn - 1]
    // );

    // eslint-disable-next-line no-loop-func
    currNeighbours.map((el) => {
      if (
        el === false ||
        typeof el == 'undefined' ||
        el.isWall ||
        closed.includes(el)
      ) {
        return false;
      }
      // Calculate Gn for all Neighbours
      el.Gn =
        curr.Gn +
        Math.abs(curr.gridRow - el.gridRow) +
        Math.abs(curr.gridColumn - el.gridColumn);

      //TODO - Allow going through walls with lower priority
      el.Fn = el.Gn + el.Hn;

      el.parent = curr;

      let indexOfNeighbour = opened.indexOf(el);
      //Add all curr neighbours to opened list and update Gn in case found a shorted path to it
      if (indexOfNeighbour !== -1) {
        opened[indexOfNeighbour].Gn =
          opened[indexOfNeighbour].Gn > el.Gn
            ? el.Gn
            : opened[indexOfNeighbour].Gn;
        opened[indexOfNeighbour].Fn =
          opened[indexOfNeighbour].Gn + opened[indexOfNeighbour].Hn;
      } else {
        opened.push(el);
      }
      return el;
    });

    opened.sort((n1, n2) => n1.Fn - n2.Fn);
    closed.push(curr);

    //Cleanup
    currNeighbours.splice(0, currNeighbours.length);
  }

  //Build path
  let parent = grid[rowEnd][colEnd].parent;
  let path = [];
  if (foundPath) {
    while (parent !== grid[rowStart][colStart]) {
      path.push(parent);
      parent = parent.parent;
    }
  }
  return { grid, visited, path };
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

//Heuristic Chebyshev distance.

// function heuristic(node) =
//     dx = abs(node.x - goal.x)
//     dy = abs(node.y - goal.y)
//     return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)
