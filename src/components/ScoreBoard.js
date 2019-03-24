import React from 'react'

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
