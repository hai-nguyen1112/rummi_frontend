import React from 'react'
// import Card from './Card'
import Group from './Group'
class CommonContainer extends React.Component {
  render() {
    console.log(this.props.cardGroups)
    let commonCardGroups = this.props.cardGroups.map(group => <Group group={group}/>)
  return (
    <div className="ui grid">
      {commonCardGroups}
    </div>
  )
  }
}

export default CommonContainer
