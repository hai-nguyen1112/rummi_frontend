import React from 'react'
import Card from './Card'

const ComputerContainer = props => {
  let computerCards = props.computerCards.map(card => <Card key={card.id} card={card}/>)
  return (
    <div className="row">
    {computerCards}
    </div>
  )
}

export default ComputerContainer
