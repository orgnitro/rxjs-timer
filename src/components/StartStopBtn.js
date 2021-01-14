import React from 'react'


export default function StartBtn(props) {
  const style={
      backgroundColor: '#a2d194',
      borderRadius: '2px',
      border: 'none',
      width: '20%',
      height: '30px',
      margin: '10px',
      padding: '0',
  }
  
  return (
    <button style={style} onClick={props.handler}>Start/Stop</button>
  )
}