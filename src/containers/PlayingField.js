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
      remainingCards: [],
      playerCardGroup: [],
      approvedCardGroup: []
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

  handleClickOfCard = card => {
    let group = this.state.playerCardGroup
    group.push(card)
    this.setState({playerCardGroup: group})
  }

  handleClickOfCheck = () => {
    let group = this.state.playerCardGroup

    if (group.every((val, i, arr) => val.color === arr[0].color)) {
      group.sort((a, b) => a.number - b.number)
      let card = group[0].number - 1
      let total = 0
      for (let i=0; i<group.length; i++) {
        total += group[i].number
        if (group[i].number === card + 1) {
          card = group[i].number
        }
      }
      if (card === group[group.length - 1].number && total >= 30 && group.length >= 3) {
        this.setState({approvedCardGroup: group})
        this.setState({playerCardGroup: []})
      } else {
        this.setState({playerCardGroup: []})
      }
    }

    if (group.every((val, i, arr) => val.number === arr[0].number)) {
      let colorGroup = []
      let total = 0
      for (let i=0; i<group.length; i++) {
        total += group[i].number
        colorGroup.push(group[i].color)
      }
      let unique = colorGroup.filter((val, i, arr) => arr.indexOf(val) === i)
      if (unique.length === group.length && total >= 30 && group.length >= 3) {
        this.setState({approvedCardGroup: group})
        this.setState({playerCardGroup: []})
      } else {
        this.setState({playerCardGroup: []})
      }
    }
  }

  render() {
    return (
      <div className="ui vertically divided grid">
        <ComputerContainer
          computerCards={this.state.computerCards}
        />
        <CardPool
          approvedCardGroup={this.state.approvedCardGroup}
        />
        <PlayerContainer
          playerCards={this.state.playerCards}
          onClickOfCard={this.handleClickOfCard}
          onClickOfCheck={this.handleClickOfCheck}
        />
      </div>
    )
  }
}

export default PlayingField
