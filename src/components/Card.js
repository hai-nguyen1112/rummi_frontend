import React from 'react'

const Card = props => {
  return (
      <div className="hello" style={{background: props.card.color, color: 'white'}} onMouseEnter={(e)=>props.onCardMouseEnter(e)} onMouseLeave={(e)=>props.onCardMouseLeave(e)} onClick={(e) => {props.onClickOfCard(props.card); props.highlight(e)}}>
          {props.card.number}
      </div>
  )
}

export default Card
