import React from 'react'

function Modal({text, modalClass}) {
  return (
    <div className={`no-path-modal ${modalClass}`}>
      <div className='no-path-modal-text' >{text}</div> 
    </div>
  )
}
export default Modal
