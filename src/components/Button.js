import React from 'react'
import {Link} from 'react-router-dom'

const Button = props => {
  return(
    <div className="grid-item item5">
    <div className="ui large buttons">
    <button className={"ui button"} id={"sortButton"} data-tooltip="Click here to sort your cards." data-position="top left" onClick={props.onClickOfSort}>Sort Cards</button>
    <div className="or"></div>
    <button className={"ui button"} id={"checkButton"} data-tooltip="Select at least three cards that satisfy the rummikub requirements." data-position="top left" onClick={props.onClickOfCheck}>Submit a Group</button>
    <div className="or"></div>
    <button className={"ui button"} id={"clearButton"} data-tooltip="Accidentally clicked the wrong card? Clear your current group and start over." data-position="top left" onClick={props.onClickOfClear}>Clear Group</button>
    <div className="or"></div>
    <button className={"ui button"} id={"doneButton"} data-tooltip="Once you've submitted your groups, click I'm done." data-position="top left" onClick={props.onClickOfDone}>I'm done. Computer's turn!</button>
    <div className="or"></div>
    <button className={"ui button"} id={"drawButton"} data-tooltip="If you can't make a move, skip your turn by drawing a card." data-position="top left" onClick={props.onClickOfDraw}>Draw Card</button>
    <div className="or"></div>
    <Link to={`/`}>
    <button className={"ui button"} id={"quitButton"} data-tooltip="Quit the game and go back to the home page." data-position="top left">Quit Game</button>
    </Link>
    </div>
    </div>
  )
}

export default Button
