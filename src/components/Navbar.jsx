import React,{useState} from 'react'

function Navbar({handleVisualizeClick, handleAddMaze, handleClrMaze,handleSetSpeed, createNewBoard}) {

  const [AlgoDropdownOpened, setAlgoDropdownOpened] = useState(false);

  const toggleAlgoDropdown = () => {
    setAlgoDropdownOpened(AlgoDropdownOpened => !AlgoDropdownOpened);
  }

  return (
    <ul className="navbar-list">
      <li className="navbar-item">
        <div className='alogrithms-list-header'>Algorithms <i className="fas fa-caret-down" onClick={() => toggleAlgoDropdown()}></i></div>
        <ul className={`algorithms-list ${AlgoDropdownOpened ? 'opened' : ''}`}>
          <li className="algorithm-list-item"> 
          <button className="visualizer-btn" onClick={() => {toggleAlgoDropdown(); handleVisualizeClick('A*')}}>
         A*
        </button>
          </li>
          <li className="algorithm-list-item"> 
          <button className="visualizer-btn" onClick={() => {toggleAlgoDropdown();
            handleVisualizeClick('dijkstra')}}>
         Dijkstra
        </button></li>
          <li className="algorithm-list-item"> 
          <button className="visualizer-btn" disabled onClick={() => {toggleAlgoDropdown();
          handleVisualizeClick('BFS')}}>
         BFS
        </button>
           </li>
          <li className="algorithm-list-item">
          <button className="visualizer-btn" disabled onClick={() => {toggleAlgoDropdown();handleVisualizeClick('DFS')}}>
         DFS
        </button>
             </li>
        </ul>
      </li>
      <li className="navbar-item">
        <button className="add-maze-btn" onClick={() => handleAddMaze()}>Add Maze</button>
      </li>
      <li className="navbar-item">
        <button className="new-board-btn" onClick={() => handleClrMaze()}>New Board</button>
      </li>
      <li className="navbar-item "> 
          <button className="visualizer-btn visualize-btn" onClick={() => {toggleAlgoDropdown(); handleVisualizeClick('A*')}}>
         Visualize
        </button>
      </li>
      <li className="navbar-item" id="animation-speed">
        <span>Set Animation Speed </span>
        <button className="set-speed-btn" onClick={() => handleSetSpeed(1)}>+</button>
        <button className="set-speed-btn" onClick={() => handleSetSpeed(-1)}>-</button>
      </li>
    </ul>
  )
}

export default Navbar
