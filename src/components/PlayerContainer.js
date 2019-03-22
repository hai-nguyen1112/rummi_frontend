import React from 'react'
import Card from './Card'

const PlayerContainer = props => {
  let playerCards = props.playerCards.map(card => <Card key={card.id} card={card}/>)
  return (
    <div className="forteen column row">
    {playerCards}
    </div>
  )
}

export default PlayerContainer
