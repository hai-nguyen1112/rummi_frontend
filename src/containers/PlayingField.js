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
      straightGroups: [],
      colorGroups: [],
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

  addStraightGroup = (cards) => {
    if (!this.state.straightGroups.includes(cards)) {
      this.setState({straightGroups: [...this.state.straightGroups, cards] })
    }
  }

  addColorGroup = (cards) => {
    if (!this.state.colorGroups.includes(cards)) {
      this.setState({colorGroups: [...this.state.colorGroups, cards] })
    }
  }

  clearGroup = () => {
    this.setState({playerCardGroup: []})
  }

  removeGroupFromPlayerHand = (group) => {
    let arr = this.state.playerCards
    arr = arr.filter(card => !group.includes(card))
    this.setState({playerCards: arr})
  }

  removeCardFromPlayerHand = (card) => {
    let arr = this.state.playerCards
    arr = arr.filter(c => c != card)
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
    this.toggleDoneButton(true)
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
          this.addStraightGroup(group)
          this.toggleDoneButton(false)
          this.toggleDrawButton(true)
          this.setState({playerScore: this.state.playerScore+1})
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
          this.addColorGroup(group)
          this.toggleDoneButton(false)
          this.toggleDrawButton(true)
          this.setState({playerScore: this.state.playerScore+1})
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
    this.setState({computerStatement: "I drew a card. Your turn."})

  }

  toggleDoneButton = (input) => {
    document.getElementById("doneButton").disabled = input
  }

  toggleDrawButton = (input) => {
    document.getElementById("drawButton").disabled = input
  }


  computerTurn = () => {
    computerdrawarray = []
    console.log("it's my turn now mwahaha - computer")
    this.setState({computerStatement: "It's my turn now."})
    let computerCards = this.state.computerCards
    let byNumber = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[]}
    computerCards.forEach(card=> byNumber[card.number] = [...byNumber[card.number],card])
    let colorArray
    for (const key in byNumber) {
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
            this.addColorGroup(finalArray)
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
              this.addStraightGroup(straight)
              this.setState({computerScore: this.state.computerScore+1})
              this.setState({computerStatement: "I found a group."})
              console.log("found a group!!!!!!! 2")
              computerdrawarray.push("found")
            }
          )
        }
      }
    }

    let allCommonCardGroups = this.state.cardGroups
    let firstStraightCards = []
    let lastStraightCards = []
    let firstColorCards = []
    let lastColorCards = []
    allCommonCardGroups.forEach(group=>{


    })





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
      if (_.isEmpty(this.state.remainingCards)) {
        this.toggleDrawButton(true)
        console.log("no more cards in deck")
      } else {
        if (!computerdrawarray.includes("found")) {
          console.log('computer draws a card')
          this.drawCardForComputer()
        } else {
          console.log('computer does not need to draw a card')
          this.setState({computerStatement: "I submitted my groups. Your turn."})
        }
        this.toggleDoneButton(true)
        this.toggleDrawButton(false)}
      }

      handleClickOfCommonCard = (card) =>{
        console.log("yooooooooo")
        let commonCardGroup = this.state.cardGroups.filter(cardGroup=>cardGroup.includes(card))[0]
        if (this.state.playerCardGroup[0]){
          let selectedCard = this.state.playerCardGroup[0]
          if (commonCardGroup[0].color === commonCardGroup[1].color && commonCardGroup[0].color === selectedCard.color) {
            if (selectedCard.number === commonCardGroup[commonCardGroup.length - 1].number +1) {
              this.updateStraightCardGroupLast(commonCardGroup, selectedCard)
              this.toggleDoneButton(false)
              this.toggleDrawButton(true)
            } else if (selectedCard.number === commonCardGroup[0].number -1) {
              this.updateStraightCardGroupFirst(commonCardGroup, selectedCard)
              this.toggleDoneButton(false)
              this.toggleDrawButton(true)
            }
          } else {
            if (commonCardGroup.length < 4) {
              if (selectedCard.number === commonCardGroup[0].number) {
                let cardColors = commonCardGroup.map(card=> card.color)
                if (!cardColors.includes(selectedCard.color)) {
                  this.updateColorCardGroup(commonCardGroup, selectedCard)
                  this.toggleDoneButton(false)
                  this.toggleDrawButton(true)
                }
              }
            }
          }}
        }

        updateColorCardGroup = (cardGroup, card) => {
          let newCardGroup = cardGroup.concat(card)
          console.log(cardGroup)
          console.log(newCardGroup)
          let newCommonCardGroups = this.state.cardGroups.filter(group=> group !== cardGroup)
          let newColorGroup = this.state.colorGroups.filter(group=> group !== cardGroup)
          this.setState({cardGroups: newCommonCardGroups.concat([newCardGroup])})
          this.setState({colorGroups: newColorGroup.concat([newCardGroup])})
          this.removeCardFromPlayerHand(card)
          this.setState({playerCardGroup: []})
        }

        updateStraightCardGroupLast = (cardGroup, card) => {
          let newCardGroup = cardGroup.concat(card)
          console.log(cardGroup)
          console.log(newCardGroup)
          let newCommonCardGroups = this.state.cardGroups.filter(group=> group !== cardGroup)
          let newStraightGroup = this.state.straightGroups.filter(group=> group !== cardGroup)
          this.setState({cardGroups: newCommonCardGroups.concat([newCardGroup])})
          this.setState({straightGroups: newStraightGroup.concat([newCardGroup])})
          this.removeCardFromPlayerHand(card)
          this.setState({playerCardGroup: []})
        }

        updateStraightCardGroupFirst = (cardGroup, card) => {
          let newStraightGroup = this.state.straightGroups.filter(group=> group !== cardGroup)
          cardGroup.unshift(card)
          console.log(cardGroup)
          let newCommonCardGroups = this.state.cardGroups
          this.setState({cardGroups: newCommonCardGroups})
          this.setState({straightGroups: newStraightGroup.concat([cardGroup])})
          this.removeCardFromPlayerHand(card)
          this.setState({playerCardGroup: []})
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
