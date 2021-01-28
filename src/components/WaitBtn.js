import React from 'react'


export default function WaitBtn({ handler }) {

  return (
    <button className="wait-btn" onClick={handler}>Wait</button>
  )
}
