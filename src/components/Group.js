import React from 'react'
import Card from './Card'

class Group extends React.Component {
  render() {
    let commonCards = this.props.group.map(card => <Card key={card.id} card={card}/>)
    return (
      <div className="column">
        {commonCards}
      </div>
    )
  }
}

export default Group
