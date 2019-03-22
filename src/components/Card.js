import React from 'react'

const Card = props => {
  return (
    <div className="column">
      <div className="ui card" style={{background: props.card.color, color: 'white'}}>
          {props.card.number}
      </div>
    </div>
  )
}

export default Card
