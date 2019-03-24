import React from 'react'
import Card from './Card'

const ComputerContainer = props => {
  let computerCards = props.computerCards.map(card => <Card key={card.id} card={card} onHoverOfCard={()=>{""}}/>)
  return (
    <div className="fourteen column row">
    {computerCards}
    </div>
  )
}

export default ComputerContainer
