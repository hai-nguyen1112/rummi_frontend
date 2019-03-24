import React from 'react'
import Group from './Group'
// centered ui raised card
// <div className="ui piled segment">
//   <p >
//     {props.playerCardGroup && <Group group={props.playerCardGroup}/>}
//   </p>
// </div>
const ScoreBoard = props => {
  return(
    <>
    <div className="ui statistics">
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
      <div className="ui piled segment">
        <p>
          {props.computerStatement}
        </p>
      </div>
  </>
  )
}

export default ScoreBoard
