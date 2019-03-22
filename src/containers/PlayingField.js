import React from 'react'
import ComputerContainer from '../components/ComputerContainer'
import PlayerContainer from '../components/PlayerContainer'
import CardPool from '../components/CardPool'

class PlayingField extends React.Component {
  constructor() {
    super()
    this.state = {
      computerCards: [],
      playerCards: [],
      remainingCards: []
    }
  }

  generateComputerCards = cards => {
    let computerCards = []
    let randomCard
    for (var i=0; i<14; i++) {
      randomCard = cards[Math.floor(Math.random() * cards.length)]
      cards.splice(cards.indexOf(randomCard), 1)
      computerCards.push(randomCard)
    }
    return computerCards
  }

  generatePlayerCards = cards => {
    let playerCards = []
    let randomCard
    for (var i=0; i<14; i++) {
      randomCard = cards[Math.floor(Math.random() * cards.length)]
      cards.splice(cards.indexOf(randomCard), 1)
      playerCards.push(randomCard)
    }
    return playerCards
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/cards')
    .then(res => res.json())
    .then(allCards => {
      let cards = allCards
      let computerCards = this.generateComputerCards(cards)
      let playerCards = this.generatePlayerCards(cards)
      this.setState({computerCards: computerCards, playerCards: playerCards, remainingCards: cards})
    })
  }

  render() {
    return (
      <div className="ui vertically divided grid">
        <ComputerContainer computerCards={this.state.computerCards}/>
        <CardPool />
        <PlayerContainer playerCards={this.state.playerCards}/>
      </div>
    )
  }
}

export default PlayingField
