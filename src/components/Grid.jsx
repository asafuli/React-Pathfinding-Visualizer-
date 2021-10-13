import { useState, useEffect } from 'react';
import GridCell from './GridCell';
import findPathAstarUtils  from '../utils/utils';

// Extracted cell outside of the function component in order to avoid reinstantiation on every Render 
// Warning was useEffect : https://stackoverflow.com/questions/65321359/how-to-fix-warning-function-makes-the-dependencies-of-useeffect-hook-change


const cell = {
  isOpend: false,
  isClosed: false,
  xCoordinate:null,
  yCoordinate:null,
  visited: false,
  selected: false,
  isStart: false,
  isTarget: false,
  Fn:0,
  Gn:0,
  Hn:0
};

function initializeStartAndTarget(cols, rows) {
  let xStartingCell = Math.floor(Math.random() * cols);
  let yStartingCell = Math.floor(Math.random() * rows);
  let xTargetCell = Math.floor(Math.random() * cols);
  let yTargetCell = Math.floor(Math.random() * rows);

  if (xTargetCell === xStartingCell && yTargetCell === yStartingCell) {
    xTargetCell = (xTargetCell + 10) % cols;
    yTargetCell = (yTargetCell + 10) % rows;
  }
  return { xStartingCell, yStartingCell, xTargetCell, yTargetCell };
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
      for (let col = 0; col < cols; col++){
        newBoard.push([]);
        for (let row = 0; row < rows; row++){
          newBoard[col].push({...cell, xCoordinate: col, yCoordinate: row})
        }
      }
      
      let { xStartingCell, yStartingCell, xTargetCell, yTargetCell } = initializeStartAndTarget(cols, rows);   

      console.log(xStartingCell, yStartingCell, xTargetCell, yTargetCell);
      newBoard[xStartingCell][yStartingCell].isStart = true;
      newBoard[xTargetCell][yTargetCell].isTarget = true;
      setStart([xStartingCell, yStartingCell]);
      setTarget([xTargetCell, yTargetCell]);

      console.log(newBoard);
      setBoard(newBoard);

    }
    
    console.log('effect called');
    return () => {}
  }, [board.length])


  useEffect(() => {

    setAlgorithm(chosenAlgo);

    switch (Algorithm){
      case 'A*':
        setBoard(findPathAstar(start, target, board));
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
      {board.map((col, colIdx) => col.map((cell,cellIdx) => <GridCell key={`${colIdx}-${cellIdx}`} cellData={cell}></GridCell>))}
    </div>
  )

  
}

export default Grid
