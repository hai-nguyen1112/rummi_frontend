import React from 'react'
import Card from './Card'

const CardPool = props => {
  let commonCards = props.approvedCardGroup.map(card => <Card key={card.id} card={card}/>)
  return (
    <div className="row">
    {commonCards}
    </div>
  )
}

export default CardPool
