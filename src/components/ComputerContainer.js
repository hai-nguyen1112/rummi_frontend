import React from 'react'
import Card from './Card'

const ComputerContainer = props => {
  let computerCards = props.computerCards.map(card => <Card onCardMouseEnter={() => {}} onCardMouseLeave={() => {}} key={card.id} card={card}/>)
  return (
    <div className="grid-item item2">
    {computerCards}
    </div>
  )
}

export default ComputerContainer
