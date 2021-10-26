import React from 'react'

function Navbar({handleVisualizeClick, handleAddMaze, handleClrMaze, createNewBoard}) {
  
  return (
    <ul className="navbar-list">
      <li className="navbar-item">
        <h2>Pathfinding Visualizer</h2>
      </li>
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
    </ul>
  )
}

export default Navbar
