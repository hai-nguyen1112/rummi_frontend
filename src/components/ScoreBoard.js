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
    <div className="grid-item item1" id="scoreheader">
    <div className="ui statistics" id="stats">
      <div className="statistic">
        <div className="value">
        {props.playerScore}
        </div>
        <div className="label">
        Player Score
        </div>
      </div>
      <div className="statistic">
        <div className="value">
          {props.computerScore}
        </div>
        <div className="label">
          Computer Score
        </div>
      </div>
    </div>
  </div>

      <div className="grid-item item6">
      <div className="ui piled segment">
        <p>
          {props.computerStatement}
        </p>
      </div>
      </div>

    </>
  )
}

export default ScoreBoard
