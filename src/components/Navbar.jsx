import React,{useState} from 'react'

function Navbar({updateChosenAlgo,chosenAlgo, updateShouldVisualize, handleAddMaze, handleClrMaze,handleSetSpeed, createNewBoard, }) {

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
          <button className="visualizer-btn" disabled onClick={() => {updateChosenAlgo('DFS')}}>
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
          <button className="visualizer-btn visualize-btn" onClick={() => {setAlgoDropdownOpened(false); updateShouldVisualize(true)}}>
         Visualize {chosenAlgo}
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
