import React from 'react'


export default function StartBtn({ handler }) {

  return (
    <button className="start-stop-btn" onClick={handler}>Start/Stop</button>
  )
}