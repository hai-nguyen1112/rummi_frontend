import React from 'react'
import Card from './Card'

const PlayerContainer = props => {
  let playerCards = props.playerCards.map(card => <Card key={card.id} card={card} onCardMouseLeave={props.onCardMouseLeave} onCardMouseEnter={props.onCardMouseEnter} highlight={props.highlight} onClickOfCard={props.onClickOfCard}/>)
  return (
    <div className="grid-item item4">
      {playerCards}
    </div>
  )
}

export default PlayerContainer
