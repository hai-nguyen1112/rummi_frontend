import React from 'react'
import ComputerContainer from '../components/ComputerContainer'
import PlayerContainer from '../components/PlayerContainer'
import CommonContainer from '../components/CommonContainer'

class PlayingField extends React.Component {
  constructor() {
    super()
    this.state = {
      computerCards: [],
      playerCards: [],
      remainingCards: [],
      playerCardGroup: [],
      approvedCardGroup: [],
      cardGroups: []
    }
  }

  addApprovedCardGroup = (cards) => {
    this.setState({cardGroups: [...this.state.cardGroups, cards] })
  }

  removeGroupFromHand = (group) => {
    let arr = this.state.playerCards
    arr = arr.filter(card => !group.includes(card))
    this.setState({playerCards: arr})
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
    if (!group.includes(card)) {
      group.push(card)
    }
    this.setState({playerCardGroup: group})
  }

  handleClickOfCheck = () => {
    let group = this.state.playerCardGroup
    if (group.length >= 1) {
      if (group.every((val, i, arr) => val.color === arr[0].color)) {
        group.sort((a, b) => a.number - b.number)
        let card = group[0].number - 1
        for (let i=0; i<group.length; i++) {
          if (group[i].number === card + 1) {
            card = group[i].number
          }
        }
        if (card === group[group.length - 1].number &&  group.length >= 3) {
          this.setState({approvedCardGroup: group})
          this.removeGroupFromHand(group)
          this.addApprovedCardGroup(group)
          this.computerTurn()
          this.setState({playerCardGroup: []})
        } else {
          this.setState({playerCardGroup: []})
        }
      }

      if (group.every((val, i, arr) => val.number === arr[0].number)) {
        let colorGroup = []
        for (let i=0; i<group.length; i++) {
          colorGroup.push(group[i].color)
        }
        let unique = colorGroup.filter((val, i, arr) => arr.indexOf(val) === i)
        if (unique.length === group.length && group.length >= 3) {
          this.setState({approvedCardGroup: group})
          this.removeGroupFromHand(group)
          this.addApprovedCardGroup(group)
          this.computerTurn()
          this.setState({playerCardGroup: []})
        } else {
          this.setState({playerCardGroup: []})
        }
      }
    } else {
      this.setState({playerCardGroup: []})
    }
  }

  handleClickOfDraw = () => {
    let remainingCards = this.state.remainingCards
    let randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)]
    this.setState({playerCards: [...this.state.playerCards, randomCard], remainingCards: remainingCards.filter(card => {return card.id !== randomCard.id})})
    this.computerTurn()
  }

  computerTurn = () => {
    console.log("it's my turn now mwahaha - computer")
    // grab computer cards
    // see if it can create a group
    // if not draw card and end turn


    // stretch: if not, see if it can add to common card group before or after
  }

  render() {
    return (
      <div className="ui vertically divided grid">
        <ComputerContainer
          computerCards={this.state.computerCards}
        />
        <CommonContainer
          cardGroups={this.state.cardGroups}
        />
        <PlayerContainer
          playerCards={this.state.playerCards}
          onClickOfCard={this.handleClickOfCard}
          onClickOfCheck={this.handleClickOfCheck}
          onClickOfDraw={this.handleClickOfDraw}
        />
      </div>
    )
  }
}

export default PlayingField
