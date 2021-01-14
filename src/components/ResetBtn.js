import React from 'react'


export default function ResetBtn(props) {
  const style={
    backgroundColor: '#e84258',
    borderRadius: '2px',
    border: 'none',
    width: '20%',
    height: '30px',
    margin: '10px',
    padding: '0'
}

  return (
    <button style={style} onClick={props.handler}>Stop</button>
  )
}
