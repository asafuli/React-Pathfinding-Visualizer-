import React from 'react'

function Navbar({handleVisualizeClick, handleAddMaze, handleClrMaze, createNewBoard}) {
  
  return (
    <ul className="navbar-list">
      <li className="navbar-item">
        Pathfinder Visualizer
      </li>
      <li className="navbar-item">
        Algorithms
      </li>
      <li className="navbar-item">
        Mazes & Patthers
        <button className="add-maze-btn" onClick={() => handleAddMaze()}>Add Maze</button>
        <button className="clr-maze-btn" onClick={() => handleClrMaze()}>New Board</button>
      </li>
      <li className="navbar-item">
        Add Halfway Point
      </li>
      <li className="navbar-item">
        <button className="visualizer-btn" onClick={() => handleVisualizeClick('A*')}>
        Visualize
        </button>
        
      </li>
      <li className="navbar-item">
        Clear Board
      </li>
      <li className="navbar-item">
        Clear Walls & Weights
      </li>
      <li className="navbar-item">
        Clear Path
      </li>
      <li className="navbar-item">
        Speed:
      </li>
    </ul>
  )
}

export default Navbar
