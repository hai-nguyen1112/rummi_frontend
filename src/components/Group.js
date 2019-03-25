import React from 'react'
import Card from './Card'

class Group extends React.Component {
  render() {
    let commonCards = this.props.group.map(card => <Card highlight={this.props.highlight} onCardMouseEnter={()=>{}} onCardMouseLeave={()=>{}} onClickOfCard={this.props.onClickOfCard} key={card.id} card={card}/>)
    return (
      <div className="row centered">
        {commonCards}
      </div>
    )
  }
}

export default Group
