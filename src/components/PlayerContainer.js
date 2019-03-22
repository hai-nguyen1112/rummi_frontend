import React from 'react'
import Card from './Card'

const PlayerContainer = props => {
  let playerCards = props.playerCards.map(card => <Card key={card.id} card={card} onClickOfCard={props.onClickOfCard}/>)
  return (
    <div className="forteen column row">
      {playerCards}
      <button onClick={props.onClickOfCheck}>Check</button>
    </div>
  )
}

export default PlayerContainer
