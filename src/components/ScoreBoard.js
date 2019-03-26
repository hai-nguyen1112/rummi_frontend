import React from 'react'
import Group from './Group'
// centered ui raised card
// <div className="ui piled segment">
//   <p>
//     {props.playerCardGroup && <Group group={props.playerCardGroup}/>}
//   </p>
// </div>

const ScoreBoard = props => {
  return(
    <>
    <div className="grid-item item6">
      <div className="state">  <img className="ui right spaced avatar image" src={require('../images/rummi.png')}/>
    <div id="rummisays" className="ui label big">
        <div className="detail">{props.computerStatement}</div>
      </div>
       </div>
    </div>
    <div className="grid-item item7">
      <p id="playerHand">
        Player Hand
      </p>
    </div>
    <div className="grid-item item1" id="scoreheader">
    <div className="ui statistics" id="stats">
      <div className="statistic">
        <div className="value" id="score">
          {props.computerScore}
        </div>
        <div className="label" id="statsHand">
          Computer Score
        </div>
      </div>
      <div className="statistic">
        <div className="value" id="score">
        {props.playerScore}
        </div>
        <div className="label" id="statsHand">
        Player Score
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default ScoreBoard
