import React from 'react'

const Button = props => {
  return(
    <>
    <button onClick={props.onClickOfCheck}>Check</button>
    <button onClick={props.onClickOfDraw}>Draw Card</button>
    </>
  )
}

export default Button
