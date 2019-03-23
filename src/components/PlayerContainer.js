import React from 'react'
import Card from './Card'

const PlayerContainer = props => {
  let playerCards = props.playerCards.map(card => <Card key={card.id} card={card} onClickOfCard={props.onClickOfCard}/>)
  return (
    <div className="fourteen column row">
      {playerCards}
    </div>
  )
}

export default PlayerContainer
