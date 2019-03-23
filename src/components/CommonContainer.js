import React from 'react'
// import Card from './Card'
import Group from './Group'

class CommonContainer extends React.Component {
  render() {
    let time = Date.now()
    let commonCardGroups = this.props.cardGroups.map(group => <Group key={time} group={group}/>)
  return (
    <div>
      {commonCardGroups}
    </div>
  )
  }
}

export default CommonContainer
