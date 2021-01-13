import React from 'react'


export default function TimerScreen(props) {
  const screenStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
  return (
    <div style={screenStyle}>
      {props.hours}:{props.minutes}:{props.seconds}
    </div>
  )
}
