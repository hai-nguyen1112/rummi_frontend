import React from 'react'
import ComputerContainer from '../components/ComputerContainer'
import PlayerContainer from '../components/PlayerContainer'
import CommonContainer from '../components/CommonContainer'
import Button from  '../components/Button'
import ScoreBoard from  '../components/ScoreBoard'
var _ = require('underscore')
let computerdrawarray = []

class PlayingField extends React.Component {
  constructor() {
    super()
    this.state = {
      computerCards: [],
      playerCards: [],
      remainingCards: [],
      playerCardGroup: [],
      approvedCardGroup: [],
      cardGroups: [],
      playerScore: 0,
      computerScore: 0,
      computerStatement: "Hi, I'm Rummi. Let's play a game. You start."
    }
  }

  addApprovedCardGroup = (cards) => {
    if (!this.state.cardGroups.includes(cards)) {
    this.setState({cardGroups: [...this.state.cardGroups, cards] })
  }
      console.log("card groups",this.state.cardGroups)
  }

  clearGroup = () => {
    this.setState({playerCardGroup: []})
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
    document.getElementById("doneButton").disabled = true

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
          this.setState({playerScore: this.state.playerScore+1})
          document.getElementById("drawButton").disabled = true
          document.getElementById("doneButton").disabled = false
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
          this.setState({playerScore: this.state.playerScore+1})
          document.getElementById("drawButton").disabled = true
          document.getElementById("doneButton").disabled = false
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
    document.getElementById("drawButton").disabled = false
    document.getElementById("doneButton").disabled = true
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
    this.setState({computerStatement: "I drew a card. Your turn."})

  }

  toggleButtons = (input) => {
    document.getElementById("doneButton").disabled = input
    document.getElementById("drawButton").disabled = input
    document.getElementById("checkButton").disabled = input
    document.getElementById("clearButton").disabled = input
  }


  computerTurn = () => {
    this.toggleButtons(true)
    computerdrawarray = []
    console.log("it's my turn now mwahaha - computer")
    this.setState({computerStatement: "It's my turn now."})
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
          this.setState({computerScore: this.state.computerScore+1})
          this.setState({computerStatement: "I found a group."})
          console.log("found a group!!!!!!! 1")
          computerdrawarray.push("found")
        } else {
          console.log("found no group 1a")
      }
    }  else {
      console.log("found no group 1b")
  }
    let remainingComputerCards = this.state.computerCards
    let byColor = {"#E41414":[], "#FF8C00":[], "#0000FF":[],"#000000":[]}
    remainingComputerCards.forEach(card=> byColor[card.color] = [...byColor[card.color],card])

    for (const color in byColor) {
      byColor[color].sort((a, b) => a.number - b.number)
      byColor[color] = this.unique(byColor[color])
      console.log("sorted and uniq group",byColor[color])
    }

    for (const color in byColor) {
      let k = byColor[color][0] - 1
      let straightGroup = []
      let straightGroupArray = []
      for (let i=0; i<byColor[color].length; i++) {
      if (byColor[color][i].number === k + 1) {
          straightGroup.push(byColor[color][i])
          k = byColor[color][i].number
  		if (i === byColor[color].length - 1 && straightGroup.length >= 3) {
  			straightGroupArray.push(straightGroup)
          }
      } else {
          if (straightGroup.length >= 3) {
              straightGroupArray.push(straightGroup)
              k = byColor[color][i].number
  			straightGroup = []
              straightGroup.push(byColor[color][i])
          } else {
              k = byColor[color][i].number
              straightGroup = []
              straightGroup.push(byColor[color][i])
          }
      }
  }

      if (!_.isEmpty(straightGroupArray)) {
        console.log("step 4")

        straightGroupArray.forEach(straight => {
          console.log("step 5")

          this.addApprovedCardGroup(straight)
           this.removeGroupFromComputerHand(straight)
           this.setState({computerScore: this.state.computerScore+1})
           this.setState({computerStatement: "I found a group."})
           console.log("found a group!!!!!!! 2")
           computerdrawarray.push("found")
         }
        )
      }
    }

    // for (const color in byColor) {
    //   let lastI = 0
    //   let count = 1
    //   for (let i = 0; i<byColor[color].length-1;i++) {
    //     console.log("is it still sorted group",byColor[color])
    //     if (byColor[color][i+1].number === byColor[color][i].number +1) {
    //       console.log(byColor[color][i+1].number + " compared to " + byColor[color][i].number)
    //       count += 1
    //       console.log("count is", count)
    //       lastI=i+1
    //     } else if (count < 3 && byColor[color][i+1].number !== byColor[color][i].number +1) {
    //       count = 1
    //       console.log("reset count")
    //     }
    //   }
      // if (count >= 3) {
      //   let straight = byColor[color].slice((lastI-count)+1,lastI+1)
      //   this.addApprovedCardGroup(straight)
      //   this.removeGroupFromComputerHand(straight)
      //   this.setState({computerScore: this.state.computerScore+1})
      //   this.setState({computerStatement: "I found a group."})
      //   console.log("found a group!!!!!!! 2")
      //   computerdrawarray.push("found")
      // } else {
      //   console.log("found no group 2")
      // }
    }
    this.computerDrawCard()
  }

  unique = (array) => {
    let storage = []
    let newArray = []
    array.forEach(card=>
    {if (!storage.includes(card.number)) {
    storage.push(card.number)
    newArray.push(card)}
    })
    return newArray
  }

  computerDrawCard = () => {
    if (!computerdrawarray.includes("found")) {
      console.log('computer draws a card')
      this.drawCardForComputer()
    } else {
      console.log('computer does not need to draw a card')
      this.setState({computerStatement: "I submitted my groups. Your turn."})
    }
    this.toggleButtons(false)
  }

  handleClickOfCommonCard = (card) =>{
    console.log("yooooooooo")
    console.log(this.state.cardGroups.filter(cardGroup=>cardGroup.includes(card))[0])
    // if all same color
    //if you have a card that is +1 last card or -1 last card
    //add your card to that group and remove that card from your hand
    //if different colors if group is less than 4
    //if a mapped array of the cards color does not include card of the same number, different color
    // add that color to the group and remove from your hand
  }

  onHoverOfCard = (card) => {
    // find all cards of this color
    // make them "glow"
    // console.log(card)
    // this.playerCards.forEach(playerCard=>playerCard.color===card.color) {
    // }
  }


  render() {
    return (
      <>
      <div className="ui vertically divided grid board">
      <ScoreBoard
      computerScore={this.state.computerScore}
      playerScore={this.state.playerScore}
      computerStatement={this.state.computerStatement}
      playerCardGroup={this.state.playerCardGroup}
      />
      <ComputerContainer
      computerCards={this.state.computerCards}
      />
      <CommonContainer
      cardGroups={this.state.cardGroups}
      onClickOfCard={this.handleClickOfCommonCard}
      />
      <PlayerContainer
      playerCards={this.state.playerCards}
      onClickOfCard={this.handleClickOfCard}
      onHoverOfCard={this.onHoverOfCard}
      />
      <Button
      onClickOfCheck={this.handleClickOfCheck}
      onClickOfClear={this.clearGroup}
      onClickOfDone={this.handleClickOfDone}
      onClickOfDraw={this.handleClickOfDraw}
      />
      </div>
      </>
    )
  }
}

export default PlayingField
