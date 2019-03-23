import React from 'react'

const Button = props => {
  return(
    <>
    <button onClick={props.onClickOfCheck}>Check Group</button>
    <button onClick={props.onClickOfDone}>I'm done. Computer's turn!</button>
    <button id={"drawButton"} onClick={props.onClickOfDraw}>Draw Card</button>
    </>
  )
}

export default Button
