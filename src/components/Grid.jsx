import { useState, useEffect } from 'react';
import GridCell from './GridCell';
import {findPathAstarUtils, findPathBFSUtils, findPathDFSUtils ,findPathDijkstraUtils}  from '../utils/utils';

// Extracted cell outside of the function component in order to avoid reinstantiation on every Render 
// Warning was useEffect : https://stackoverflow.com/questions/65321359/how-to-fix-warning-function-makes-the-dependencies-of-useeffect-hook-change

const BOARD_ROWS = 23;
const BOARD_COLUMNS = 57;

const cell = {
  isOpend: false,
  isClosed: false,
  gridColumn:null,
  gridRow:null,
  visited: false,
  selected: false,
  isStart: false,
  isTarget: false,
  isWall:false,
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

  //  let colStart = 1;
  // let rowStart = 1;
  // let colTarget = BOARD_COLUMNS - 1 ;
  // let rowTarget = BOARD_ROWS - 1;

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
  return findPathDijkstraUtils(start, end, board);
}

const findPathBFS = (start, end, board) => {
  return findPathBFSUtils(start, end, board);
}

const findPathDFS = (start, end, board) => {
  return findPathDFSUtils(start, end, board);
}


function Grid({shouldVisualize, updateShouldVisualize, chosenAlgo, maze, clearBoard , handleBoardCleared, updateNoPossiblePath, noPossiblePath, triggerCreateBoard, updateChosenAlgo, handleMazeCreated, modalClicked, animationSpeed}) {

  const [board, setBoard] = useState([]);
  const [Algorithm, setAlgorithm] = useState(chosenAlgo); 
  const [start, setStart] = useState([]);
  const [target, setTarget] = useState([]);
  const [visited, setVisited] = useState([]);
  const [done, setDone] = useState(false);
  const [visitedCounter, setVisitedCounter] = useState(0);
  const [path, setPath] = useState([]);
  const [pathCounter, setPathCounter] = useState(0);
  const [visitedAnimation, setVisitedAnimation] = useState(false);

  const toggleWall = ({gridRow, gridColumn, isWall}) => {
    board[gridRow][gridColumn].isWall = !isWall
    setBoard(board => board)
  }

  useEffect(() => {

    if (triggerCreateBoard){
      console.log('create new board')
    }
    return () => {
    }
  }, [triggerCreateBoard])


  // Create Maze 
  useEffect(() => {

    if  (board.length > 0){
      let newBoard = [...board];
      if(maze && visited.length === 0){
        for (let row = 0; row < BOARD_ROWS ; row++){
          for (let col = 0; col < BOARD_COLUMNS ; col++){

            let currCell = newBoard[row][col];
            if (!currCell.isStart && !currCell.isTarget){
              if (row === 0 || row === BOARD_ROWS - 1 || col === 0 || col === BOARD_COLUMNS - 1){
                currCell.isWall = true;
              } else {
                currCell.isWall = Math.random() < 0.25;
              }
            } else {
              currCell.isWall = false;
            }
          }
        }
        handleMazeCreated();
        setBoard(board => newBoard)
      } 
      // else { 
      //   for (let row = 0; row < BOARD_ROWS ; row++){
      //     for (let col = 0; col < BOARD_COLUMNS ; col++){
      //       let currCell = newBoard[row][col];
      //       currCell.isWall = false;
      //     }
      //   }
      // }
    }
  }, [maze, board, board.length, handleMazeCreated, visited.length]
  )

  // Clear the board
  useEffect(() => {
    
    if (clearBoard) board.length = 0;
    
    if (board.length === 0){
      let rows = BOARD_ROWS;
      let cols = BOARD_COLUMNS;

      let newBoard = [];
      for (let row = 0; row < rows; row++){
        newBoard.push([]);
        for (let col = 0; col < cols; col++){
          newBoard[row].push({...cell, gridColumn: col, gridRow: row})
        }
      }
      
      let { rowStart, colStart, rowTarget, colTarget } = initializeStartAndTarget(cols, rows);   
      newBoard[rowStart][colStart].isStart = true;
      newBoard[rowTarget][colTarget].isTarget = true;
      // Reset state
      setStart([rowStart, colStart]);
      setTarget([rowTarget, colTarget]);
      setBoard(board => newBoard);
      setVisited(visited => []);
      setVisitedCounter(visitedCounter => 0);
      setPath(path => []);
      setPathCounter(pathCounter => 0);
      setDone(done => false)
      setVisitedAnimation(visitedAnimation => false);
      updateChosenAlgo('None')
      updateNoPossiblePath(false);
      handleBoardCleared();
      updateShouldVisualize(false)

    }
    return () => {}
  }, [board, clearBoard, handleBoardCleared, visited, updateChosenAlgo, updateNoPossiblePath, updateShouldVisualize])


  // Handle choosing and Algorithm and call the relevant pathfinding method 
  useEffect(() => {

    // Extraction of repeated code
    const updateStateWithPathInfo = ({grid: newBoard, visited: newVisited, path : newPath}) => {
      console.log(newPath);
      setBoard(board => newBoard);
      setVisited(visited => newVisited);
      setPath(path => newPath)
      setPathCounter(pathCounter => newPath.length - 1)
      setDone(true);
      updateChosenAlgo('None');
      updateShouldVisualize(false)
    }

    if (chosenAlgo === Algorithm & !shouldVisualize ) {
      console.log('Returning from UseEffect - Algorithm was not changed :', Algorithm);
      return;
    }

    setAlgorithm(chosenAlgo);
    let pathInfo = {};
    if (shouldVisualize){

      switch (chosenAlgo){
        case 'A*':
          pathInfo = findPathAstar(start, target, board);
          console.log(pathInfo)
          updateStateWithPathInfo(pathInfo);
          break;
        case 'dijkstra':
          pathInfo = findPathDijkstra(start, target, board); 
          updateStateWithPathInfo(pathInfo);
          break;
  
        case 'BFS':
          pathInfo = findPathBFS(start, target, board);
          updateStateWithPathInfo(pathInfo);
          break;
  
        case 'DFS':
          pathInfo =findPathDFS(start, target, board);
          updateStateWithPathInfo(pathInfo);
          break;
  
        default:
          console.log(`Algorithm ${Algorithm} cant be visualized... `)
      
      }
    }
  
    return () => {};
  }, [Algorithm, start, target, board,chosenAlgo, updateChosenAlgo, updateShouldVisualize, shouldVisualize])


  // // Handle Animation for the Visited cells
  useEffect(
    () => {
      let paintVisitedInterval = setTimeout(() => {
      
        if (visited.length === 0 || visitedCounter >= visited.length) {
          //debugger;
          if (visitedCounter >= visited.length && visited.length > 0){
            setVisitedAnimation(visitedAnimation => true);
          }
          clearTimeout(paintVisitedInterval);
          return;
        }
        visited[visitedCounter].visited = true;
        setVisitedCounter(visitedCounter => visitedCounter + 1);
        return setVisited(visited => visited)
       } 
       ,animationSpeed 
      );

    },
    [done, visited, visitedCounter,visitedAnimation, animationSpeed]
  );

  // Handle animation for path
  useEffect(() => {

    if (visitedAnimation){
 
      // Handle scenario where no path exists
      if (path.length === 0 && !noPossiblePath && !modalClicked){
        debugger
        updateNoPossiblePath(true);
        updateChosenAlgo('None');
        updateShouldVisualize(false)
      }

      let paintSelectedInterval = setTimeout(() => {
        if ( pathCounter < 0) {
         clearTimeout(paintSelectedInterval);
         return;
        }
        path[pathCounter].selected = true;
        setPathCounter(pathCounter => pathCounter - 1);
        // console.log(path[pathCounter])
        return setPath(path => path)
       }, animationSpeed)
    }
  }, [pathCounter, path.length, path, visitedAnimation, noPossiblePath, updateNoPossiblePath, updateChosenAlgo, modalClicked, animationSpeed, updateShouldVisualize]);

 

  return (
    <>
      <div className="grid-wrapper">
      {board.map((row, rowIdx) => row.map((cell, cellIdx) => <GridCell key={`${rowIdx}-${cellIdx}`} id={`${rowIdx}-${cellIdx}`} cellData={cell} onClick={toggleWall}></GridCell>))}
      </div>
   </>
  )

  
}

export default Grid
