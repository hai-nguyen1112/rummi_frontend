import React from 'react'
// import Card from './Card'
import Group from './Group'
class CommonContainer extends React.Component {
  render() {
    let commonCardGroups = this.props.cardGroups.map(group => <Group knowCard={()=>{}} onDropOfGroup={this.props.onDropOfGroup} highlight={this.props.highlightGroup} key={this.props.cardGroups.indexOf(group)} highlightGroup={this.props.highlightGroup} onCardMouseEnter={()=>{}} onCardMouseLeave={()=>{}} onClickOfCard={this.props.onClickOfCard} group={group}/>)
  return (
    <div className="grid-item item3" knowCard={()=>{}}>
      {commonCardGroups}
    </div>
  )
  }
}

export default CommonContainer
