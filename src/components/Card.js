import React from 'react'

const Card = props => {
  return (
    <div className="column">
      <div className="ui card container" style={{background: props.card.color, color: 'white'}} onClick={() => props.onClickOfCard(props.card)}>
          {props.card.number}
      </div>
    </div>
  )
}

export default Card
