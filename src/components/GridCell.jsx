import React, {useState} from 'react'

function GridCell({cellData}) {

  const [Data, setData] = useState(cellData);

  const handleClick = (e) => {
    setData({...Data, selected: !Data.selected} )
    console.log(Data)
  }
  
  let cellStyle = { 
    selected: Data.selected ? 'selected' : '',
    isStart: Data.isStart ? 'starting-cell' : '',
    isTarget: Data.isTarget ? 'target-cell' : ''
  };


  return (
    <div className="grid-cell-wrapper">
      <div className={`grid-cell-item ${cellStyle.selected} ${cellStyle.isStart} ${cellStyle.isTarget}`}  onClick={(e) => handleClick(e)} >
      
      </div>
    </div>
  )
}
export default GridCell
