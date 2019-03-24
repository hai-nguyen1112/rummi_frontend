import React from 'react'

const Button = props => {
  return(
    <>
    <div className="ui large buttons">
    <button className={"ui button"} data-tooltip="Select at least three cards that satisfy the rummikub requirements." data-position="top left" onClick={props.onClickOfCheck}>Submit a Group</button>
    <div className="or"></div>
    <button className={"ui button"} data-tooltip="Accidentally clicked the wrong card? Clear your current group and start over." data-position="top left" onClick={props.onClickOfClear}>Clear Group</button>
    <div className="or"></div>
    <button className={"ui button"} data-tooltip="Once you've submitted your groups, click 'I'm done.'" data-position="top left" onClick={props.onClickOfDone}>I'm done. Computer's turn!</button>
    <div className="or"></div>
    <button className={"ui button"} id={"drawButton"} data-tooltip="If you can't make a move, skip your turn by drawing a card." data-position="top left" onClick={props.onClickOfDraw}>Draw Card</button>
    </div>
    </>
  )
}

export default Button
