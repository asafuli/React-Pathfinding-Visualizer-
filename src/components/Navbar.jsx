import React from 'react'

function Navbar({handleVisualizeClick, handleAddMaze, handleClrMaze,handleSetSpeed, createNewBoard}) {
  
  return (
    <ul className="navbar-list">
      <li className="navbar-item">
        Algorithms (A*) 
      </li>
      <li className="navbar-item">
        <button className="add-maze-btn" onClick={() => handleAddMaze()}>Add Maze</button>
        <button className="clr-maze-btn" onClick={() => handleClrMaze()}>New Board</button>
      </li>
      <li className="navbar-item">
        <button className="visualizer-btn" onClick={() => handleVisualizeClick('A*')}>
        Visualize
        </button>
        
      </li>
      <li className="navbar-item" id="animation-speed">
        <span>Set Animation Speed</span>
        <button className="set-speed-btn" onClick={() => handleSetSpeed(1)}>+</button>
        <button className="set-speed-btn" onClick={() => handleSetSpeed(-1)}>-</button>
        
      </li>
    </ul>
  )
}

export default Navbar
