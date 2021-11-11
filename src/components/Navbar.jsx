import React,{useState} from 'react'

function Navbar({updateChosenAlgo,chosenAlgo, updateShouldVisualize, handleAddMaze, handleClrMaze,handleSetSpeed, createNewBoard, }) {

  const [AlgoDropdownOpened, setAlgoDropdownOpened] = useState(false);
  const [buttonPressed, setButtonPressed] = useState('');

  const handleMouseDown = (e) => {
    setButtonPressed(buttonPressed => '+')
  }

  const handleMouseUp = (e) => {
    setButtonPressed(buttonPressed => '-')
  }

  const toggleAlgoDropdown = () => {
    setAlgoDropdownOpened(AlgoDropdownOpened => !AlgoDropdownOpened);
  }

  const handleVisualizeClicked = () => {

    if(chosenAlgo === '') return;
    setAlgoDropdownOpened(false); 
    updateShouldVisualize(true);
  }

  return (
    <ul className="navbar-list">
      <li className="navbar-item">
        <div className='alogrithms-list-header ' onClick={() => toggleAlgoDropdown()}>Algorithms <i className="fas fa-caret-down" ></i></div>
        <ul className={`algorithms-list ${AlgoDropdownOpened ? 'opened' : ''}`}>
          <li className="algorithm-list-item"> 
          <button className="visualizer-btn" onClick={() => { updateChosenAlgo('A*')}}>
         A*
        </button>
          </li>
          <li className="algorithm-list-item"> 
          <button className="visualizer-btn" onClick={() => {
            updateChosenAlgo('dijkstra')}}>
         Dijkstra
        </button></li>
          <li className="algorithm-list-item"> 
          <button className="visualizer-btn" disabled onClick={() => {
          updateChosenAlgo('BFS')}}>
         BFS
        </button>
           </li>
          <li className="algorithm-list-item">
          <button className="visualizer-btn" onClick={() => {updateChosenAlgo('DFS')}}>
         DFS
        </button>
             </li>
        </ul>
      </li>
      <li className="navbar-item">
        <button className="add-maze-btn" onClick={() => {setAlgoDropdownOpened(false);handleAddMaze()}}>Add Maze</button>
      </li>
      <li className="navbar-item">
        <button className="new-board-btn" onClick={() => {setAlgoDropdownOpened(false); handleClrMaze()}}>New Board</button>
      </li>
      <li className="navbar-item "> 
          <button className="visualizer-btn visualize-btn" onClick={handleVisualizeClicked}>
         Visualize {chosenAlgo}
        </button>
      </li>
      <li className="navbar-item" id="animation-speed">
        <span>Set Animation Speed </span>
        <button className={`set-speed-btn ${buttonPressed === '+' ? 'presses' : ''}`} onClick={() => handleSetSpeed(1)} onMouseDown={(e) => handleMouseDown(e)} onMouseUp={(e) => handleMouseUp(e)} >+</button>
        <button className={`set-speed-btn ${buttonPressed === '-' ? 'presses' : ''}`} onClick={() => handleSetSpeed(-1)} onMouseDown={(e) => handleMouseDown(e)} onMouseUp={(e) => handleMouseUp(e)}>-</button>
      </li>
    </ul>
  )
}

export default Navbar
