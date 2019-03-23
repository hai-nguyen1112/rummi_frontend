import React from 'react'
import ComputerContainer from '../components/ComputerContainer'
import PlayerContainer from '../components/PlayerContainer'
import CommonContainer from '../components/CommonContainer'
import Button from  '../components/Button'
var _ = require('underscore')
let computerDraw1 = false
let computerDraw2 = false

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
    console.log("card groups",this.state.cardGroups)
  }

  removeGroupFromPlayerHand = (group) => {
    let arr = this.state.playerCards
    arr = arr.filter(card => !group.includes(card))
    this.setState({playerCards: arr})
  }

  removeGroupFromComputerHand = (group) => {
    let arr = this.state.computerCards
    arr = arr.filter(card => !group.includes(card))
    this.setState({computerCards: arr})
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
    console.log(group)
    this.setState({playerCardGroup: group})
  }

  handleClickOfCheck = () => {
    let group = this.state.playerCardGroup
    console.log(group)
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
          this.removeGroupFromPlayerHand(group)
          this.addApprovedCardGroup(group)
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
          this.removeGroupFromPlayerHand(group)
          this.addApprovedCardGroup(group)
          this.setState({playerCardGroup: []})
        } else {
          this.setState({playerCardGroup: []})
        }
      }
    } else {
      this.setState({playerCardGroup: []})
    }
  }

  handleClickOfDone = () => {
    setTimeout(this.computerTurn,1000)
  }
  handleClickOfDraw = () => {
    let remainingCards = this.state.remainingCards
    let randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)]
    this.setState({playerCards: [...this.state.playerCards, randomCard], remainingCards: remainingCards.filter(card => {return card.id !== randomCard.id})})
    setTimeout(this.computerTurn,1000)
  }

  drawCardForComputer = () => {
    let remainingCards = this.state.remainingCards
    let randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)]
    this.setState({computerCards: [...this.state.computerCards, randomCard], remainingCards: remainingCards.filter(card => {return card.id !== randomCard.id})})
  }

  computerTurn = () => {
    console.log("it's my turn now mwahaha - computer")
    // grab computer cards
    let computerCards = this.state.computerCards
    let byNumber = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[]}
    computerCards.forEach(card=> byNumber[card.number] = [...byNumber[card.number],card])
    let colorArray
    for (const key in byNumber) {
      // make unique by color but pass card through
      if (byNumber[key].length >= 3) {
        colorArray = {"#E41414":[], "#FF8C00":[], "#0000FF":[],"#000000":[]}
        byNumber[key].forEach(card =>
          {if (_.isEmpty(colorArray[card.color])) {colorArray[card.color].push(card)}})
        let finalArray = []
        for (const color in colorArray) {
          console.log(colorArray)
          colorArray[color].forEach(card => finalArray.push(card))
        }
        if (finalArray.length >= 3) {
          this.addApprovedCardGroup(finalArray)
          this.removeGroupFromComputerHand(finalArray)
          console.log("found a group!!!!!!!")
          computerDraw1 = false
        } else {
          console.log("found no group 1")
          computerDraw1 = true
      }
    }  else {
      console.log("found no group 1")
      computerDraw1 = true
  }
    let remainingComputerCards = this.state.computerCards
    let byColor = {"#E41414":[], "#FF8C00":[], "#0000FF":[],"#000000":[]}
    remainingComputerCards.forEach(card=> byColor[card.color] = [...byColor[card.color],card])
    for (const color in byColor) {
      byColor[color].sort((a, b) => a.number - b.number)
    }

    for (const color in byColor) {
      let lastI = 0
      let count = 1
      for (let i = 0; i<byColor[color].length-1;i++) {
        if (byColor[color][i+1].number === byColor[color][i].number +1) {
          count += 1
          lastI=i+1
        } else {
          count = 1
        }
      }
      if (count >= 3) {
        let straight = byColor[color].slice((lastI-count)+1,lastI+1)
        this.addApprovedCardGroup(straight)
        this.removeGroupFromComputerHand(straight)
        console.log("found a group!!!!!!!")
        computerDraw2 = false
      } else {
        console.log("found no group 2")
        computerDraw2 = true}

      }
    }
    this.computerDrawCard()
  }

  computerDrawCard = () => {
    if (computerDraw1 && computerDraw2) {
      console.log('computer draws a card')
      this.drawCardForComputer()
      computerDraw1 = false
      computerDraw2 = false
    } else {
      console.log('computer does not need to draw a card')
    }
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
      />
      <Button
      onClickOfCheck={this.handleClickOfCheck}
      onClickOfDone={this.handleClickOfDone}
      onClickOfDraw={this.handleClickOfDraw}
      />
      </div>
    )
  }
}

export default PlayingField
