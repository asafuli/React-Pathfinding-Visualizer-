import React from 'react'

function Navbar({handleVisualizeClick}) {
  
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
