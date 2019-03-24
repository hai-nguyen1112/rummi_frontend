import React from 'react'
// import Card from './Card'
import Group from './Group'
class CommonContainer extends React.Component {
  render() {
    let commonCardGroups = this.props.cardGroups.map(group => <Group key={this.props.cardGroups.indexOf(group)} onHoverOfCard={()=>{}} onClickOfCard={this.props.onClickOfCard} group={group}/>)
  return (
    <div className="ui grid" id={"board"}>
      {commonCardGroups}
    </div>
  )
  }
}

export default CommonContainer
