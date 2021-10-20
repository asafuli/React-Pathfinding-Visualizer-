import React, {useState} from 'react'

function GridCell({cellData: {isWall , selected, isStart, isTarget, visited} , id, onClick}) {

  const [wall, setWall] = useState(isWall);

  const handleClick = (e) => {
    setWall(wall => !wall)
    onClick();
  }
  
  let cellStyle = { 
    selected: selected ? 'selected' : '',
    isStart: isStart ? 'starting-cell' : '',
    isTarget: isTarget ? 'target-cell' : '',
    visited: visited ? 'visited' : '',
    wall: wall ? 'wall' : ''
  };


  return (
    <div className="grid-cell-wrapper"  id={id}>
      <div className={`grid-cell-item ${cellStyle.selected} ${cellStyle.isStart} ${cellStyle.isTarget} ${cellStyle.visited} ${cellStyle.wall}`} id={id}  onClick={(e) => handleClick(e)} >
      
      </div>
    </div>
  )
}
export default GridCell
