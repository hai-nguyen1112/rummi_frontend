import React from 'react'
import Card from './Card'

class Group extends React.Component {
  render() {
    let commonCards = this.props.group.map(card => <Card knowCard={()=>{}} highlight={this.props.highlight} onCardMouseEnter={()=>{}} onCardMouseLeave={()=>{}} onClickOfCard={()=>{}} key={card.id} card={card}/>)
    return (

      <div className="row" id="group" knowCard={()=>{}} onDragOver={(e)=>{e.preventDefault()}} onDrop={(e)=>{e.preventDefault(); this.props.onDropOfGroup(this.props.group)}} >
        {commonCards}
      </div>
    )
  }
}

export default Group
