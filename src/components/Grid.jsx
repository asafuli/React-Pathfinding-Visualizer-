import { useState, useEffect } from 'react';
import GridCell from './GridCell';
import findPathAstarUtils  from '../utils/utils';

// Extracted cell outside of the function component in order to avoid reinstantiation on every Render 
// Warning was useEffect : https://stackoverflow.com/questions/65321359/how-to-fix-warning-function-makes-the-dependencies-of-useeffect-hook-change


const cell = {
  isOpend: false,
  isClosed: false,
  gridColumn:null,
  gridRow:null,
  visited: false,
  selected: false,
  isStart: false,
  isTarget: false,
  Fn:0,
  Gn:0,
  Hn:0,
  parent:''
};

function initializeStartAndTarget(cols, rows) {
  
  let colStart = Math.floor(Math.random() * cols);
  let rowStart = Math.floor(Math.random() * rows);
  let colTarget = Math.floor(Math.random() * cols);
  let rowTarget = Math.floor(Math.random() * rows);

  if (colTarget === colStart && rowTarget === rowStart) {
    colTarget = (colTarget + 10) % cols;
    rowTarget = (rowTarget + 10) % rows;
  }
  return { rowStart, colStart, rowTarget ,colTarget };
}


const findPathAstar = (start, end, board) => {
  return findPathAstarUtils(start, end, board);
}

const findPathDijkstra= (start, end, board) => {
  return null
}


function Grid({chosenAlgo}) {

  const [board, setBoard] = useState([]);
  const [Algorithm, setAlgorithm] = useState(chosenAlgo); 
  const [start, setStart] = useState([]);
  const [target, setTarget] = useState([]);
  
  useEffect(() => {
  
    if (board.length === 0){
      let rows = 25;
      let cols = 45;
      let newBoard = [];
      for (let row = 0; row < rows; row++){
        newBoard.push([]);
        for (let col = 0; col < cols; col++){
          newBoard[row].push({...cell, gridColumn: col, gridRow: row})
        }
      }
      
      let { rowStart, colStart, rowTarget, colTarget } = initializeStartAndTarget(cols, rows);   

      console.log(rowStart, colStart, rowTarget, colTarget);
      newBoard[rowStart][colStart].isStart = true;
      newBoard[rowTarget][colTarget].isTarget = true;
      setStart([rowStart, colStart]);
      setTarget([rowTarget, colTarget]);

      console.log(newBoard);
      setBoard(newBoard);

    }
    return () => {}
  }, [board])


  useEffect(() => {

    if (chosenAlgo === Algorithm) {
      console.log('Returning from UseEffect - Algorithm was not changed :', Algorithm);
      return;
    }

    setAlgorithm(chosenAlgo);
    
    switch (chosenAlgo){
      case 'A*':
        let newBoard = findPathAstar(start, target, board);
        setBoard([...newBoard]);
        break;

      case 'dijkstra':
        findPathDijkstra(start, target);
        break;

      default:
        console.log(`Algorithm ${Algorithm} cant be visualized... `)
    
    }
    

    return () => {};
  }, [Algorithm, start, target, board, chosenAlgo])


  return (
    <div className="grid-wrapper">
      {board.map((row, rowIdx) => row.map((cell, cellIdx) => <GridCell key={`${rowIdx}-${cellIdx}`} id={`${rowIdx}-${cellIdx}`} cellData={cell}></GridCell>))}
    </div>
  )

  
}

export default Grid
