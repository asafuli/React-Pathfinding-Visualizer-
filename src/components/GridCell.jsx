import React, {useState, useEffect} from 'react'

function GridCell({cellData, id, onClick}) {

  const [Data, setData] = useState(cellData);

  const handleClick = (e) => {
    setData(Data => ({...Data, isWall: !Data.isWall}) )
    onClick(cellData);
  }
  
  let cellStyle = { 
    selected: Data.selected ? 'selected' : '',
    isStart: Data.isStart ? 'starting-cell' : '',
    isTarget: Data.isTarget ? 'target-cell' : '',
    visited: Data.visited ? 'visited' : '',
    isWall: Data.isWall ? 'wall-cell': ''
  };

  useEffect(() => {

    setData(Data => cellData)
    return () => { 
    };
  }, [cellData])


  return (
    <div className="grid-cell-wrapper"  id={id}>
      <div className={`grid-cell-item ${cellStyle.selected} ${cellStyle.isStart} ${cellStyle.isTarget} ${cellStyle.visited} ${cellStyle.isWall}`} id={id}  onClick={(e) => handleClick(e)} >
      
      </div>
    </div>
  )
}
export default GridCell
