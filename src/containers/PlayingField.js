import React from 'react'
import ComputerContainer from '../components/ComputerContainer'
import PlayerContainer from '../components/PlayerContainer'
import CommonContainer from '../components/CommonContainer'
import Button from  '../components/Button'
import ScoreBoard from  '../components/ScoreBoard'
import Speech from 'speak-tts'
var _ = require('underscore')
let computerdrawarray = []

const speech = new Speech()

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
      computerStatement: "Hi, I'm Rummi. Let's play a game. You start.",
      draggedCard: {}
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
    while (document.getElementById("highlight1")) {
      document.getElementById("highlight1").id = ""
    }
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

  removeCardFromComputerHand = (card) => {
    let arr = this.state.computerCards
    arr = arr.filter(c => c != card)
    this.setState({computerCards: arr})
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
    fetch('https://rummi-backend.herokuapp.com/api/v1/cards')
    .then(res => res.json())
    .then(allCards => {
      let cards = allCards
      let computerCards = this.generateComputerCards(cards)
      let playerCards = this.generatePlayerCards(cards)
      this.setState({computerCards: computerCards, playerCards: playerCards, remainingCards: cards})
    })
    this.toggleDoneButton(true)
    this.addShakeClass()
    setTimeout(this.rummiSpeak("Hi, I'm Rummi. Let's play a game. You start."),500)
  }

  handleClickOfCard = card => {
    if (_.isEmpty(this.state.remainingCards)) {
      this.toggleDrawButton(true)
      console.log("no more cards in deck")
    }
    let group = this.state.playerCardGroup
    let groupNumberColor = group.map(group=>group.number+group.color)
    if (!groupNumberColor.includes(card.number+card.color)) {
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
          this.setState({playerScore: this.state.playerScore+group.length})
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
          this.setState({playerScore: this.state.playerScore+group.length})
          this.setState({playerCardGroup: []})
        } else {
          this.setState({playerCardGroup: []})
        }
      }
    } else {
      this.setState({playerCardGroup: []})
    }
  }

  addShakeClass = () => {
    document.querySelector('.avatar').classList.add('shake')
    setTimeout(()=>document.querySelector('.avatar').classList.remove('shake'),1000)
  }

  rummiSpeak = (rummi) => {
    speech.speak({
    text: rummi,
    }).then(() => {
        console.log("Success !")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
  }
  handleClickOfDone = () => {
    let checkScore = this.checkScore()
    if (checkScore === false) {
      this.setState({computerStatement: "My turn."})
      this.rummiSpeak("My turn.")
      setTimeout(this.computerTurn,500)
      this.addShakeClass()
    } else {
      this.toggleDoneButton(true)
      this.toggleDrawButton(true)
      document.getElementById("checkButton").disabled = true
      document.getElementById("sortButton").disabled = true
      document.getElementById("clearButton").disabled = true
    }
  }
  handleClickOfDraw = () => {
    let remainingCards = this.state.remainingCards
    let randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)]
    this.setState({playerCards: [...this.state.playerCards, randomCard], remainingCards: remainingCards.filter(card => {return card.id !== randomCard.id})})
    this.setState({computerStatement: "My turn."})
    this.rummiSpeak("My turn.")
    setTimeout(this.computerTurn,500)
    this.addShakeClass()
  }

  drawCardForComputer = () => {
    let remainingCards = this.state.remainingCards
    let randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)]
    this.setState({computerCards: [...this.state.computerCards, randomCard], remainingCards: remainingCards.filter(card => {return card.id !== randomCard.id})})
    this.setState({computerStatement: "I drew a card. Your turn."})
    this.rummiSpeak("I drew a card. Your turn.")
    this.addShakeClass()
  }

  toggleDoneButton = (input) => {
    document.getElementById("doneButton").disabled = input
  }

  toggleDrawButton = (input) => {
    document.getElementById("drawButton").disabled = input
  }


  computerTurn = () => {
    computerdrawarray = []
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
            this.setState({computerScore: this.state.computerScore+finalArray.length})
            this.addShakeClass()
            console.log("found a group!!!!!!! 1")
            computerdrawarray.push("found")
          } else {
            console.log("found no group 1a")
          }
        }  else {
          console.log("found no group 1b")
        }
      }
      setTimeout(this.nextPartComputerTurn, 500)
    }

    nextPartComputerTurn = () => {
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
            this.setState({computerScore: this.state.computerScore+straight.length})
            this.addShakeClass()
            console.log("found a group!!!!!!! 2")
            computerdrawarray.push("found")
          }
        )
      }
    }

    let allNumberGroups = this.state.colorGroups
    let allComputerCards = this.state.computerCards

    allNumberGroups.forEach(group=>{
      if (group.length < 4) {
        let colors = group.map(card=>card.color)
        this.uniqueByColorAndNumber(allComputerCards).forEach(card=>{
          if (card.number === group[0].number) {
            if (!colors.includes(card.color)) {
              this.updateNumberGroupComputer(group, card)
            }
          }
        })
      }
    }
  )

  setTimeout(this.addToStraightGroupFirstComputer, 500)
  setTimeout(this.addToStraightGroupLastComputer, 500)
  setTimeout(this.shouldComputerDraw, 500)
  }

  shouldComputerDraw = () => {
    let checkScore = this.checkScore()
    if (checkScore === false) {
      this.computerDrawCard()} else {
        this.toggleDoneButton(true)
        this.toggleDrawButton(true)
        document.getElementById("checkButton").disabled = true
        document.getElementById("clearButton").disabled = true
        document.getElementById("sortButton").disabled = true
      }
  }

  addToStraightGroupFirstComputer = () => {
    let computerCards = this.uniqueByColorAndNumber(this.state.computerCards)
    let allStraightGroups = this.state.straightGroups
    let firstStraightCards = []
    allStraightGroups.forEach(group=>{
      firstStraightCards.push(group[0])
    })
    firstStraightCards.forEach(firstCard => {
      computerCards.forEach(computerCard => {
        console.log("first card", firstCard)
        console.log("computer card color", computerCard.color)
        console.log("first card color", firstCard.color)
        console.log("computer card number", computerCard.number)
        console.log("first card number", firstCard.number)
        if (computerCard.color === firstCard.color && computerCard.number === firstCard.number - 1) {
          console.log("adding to beg of straight group")
          let commonCardGroup = this.state.cardGroups.filter(cardGroup=>cardGroup.includes(firstCard))[0]
          this.updateStraightCardGroupFirstComputer(commonCardGroup, computerCard)
          computerdrawarray.push("found")
          this.setState({computerStatement: "I added a card. Your turn."})

          this.addShakeClass()
          setTimeout(this.addToStraightGroupFirstComputer,500)
        }
      })
    })
  }

  checkScore = () => {
    if (this.state.playerScore >= 30) {

      this.setState({computerStatement: "You won! That's no fun."})
      this.addShakeClass()
      this.rummiSpeak("You won! That's no fun.")
      return true
    } else if (this.state.computerScore >= 30) {
      this.setState({computerStatement: "I won! You loser"})
      this.rummiSpeak( "I won! You loser")
      this.addShakeClass()
      return true
    } else {return false}
  }

  addToStraightGroupLastComputer = () => {
    let computerCards = this.uniqueByColorAndNumber(this.state.computerCards)
    let allStraightGroups = this.state.straightGroups
    let lastStraightCards = []
    allStraightGroups.forEach(group=>{
      lastStraightCards.push(group[group.length-1])
    })
    lastStraightCards.forEach(lastCard => {
      computerCards.forEach(computerCard => {
        console.log("last card", lastCard)
        console.log("computer card color", computerCard.color)
        console.log("last card color", lastCard.color)
        console.log("computer card number", computerCard.number)
        console.log("last card number", lastCard.number)
        if (computerCard.color === lastCard.color && computerCard.number === lastCard.number + 1) {
          console.log("adding to end of straight group")
          this.setState({computerStatement: "I added a card. Your turn."})
          this.addShakeClass()
          let commonCardGroup = this.state.cardGroups.filter(cardGroup=>cardGroup.includes(lastCard))[0]
          this.updateStraightCardGroupLastComputer(commonCardGroup, computerCard)
          computerdrawarray.push("found")
          setTimeout(this.addToStraightGroupLastComputer, 500)
        }
      })
    })
  }
  updateStraightCardGroupFirstComputer = (commonCardGroup, computerCard) => {
    let newStraightGroups = this.state.straightGroups.filter(group=> group !== commonCardGroup)
    commonCardGroup.unshift(computerCard)
    let newCommonCardGroups = this.state.cardGroups
    this.setState({cardGroups: newCommonCardGroups})
    this.setState({straightGroups: newStraightGroups.concat([commonCardGroup])})
    this.setState({computerScore: this.state.computerScore+1})
    computerdrawarray.push("found")
    this.setState({computerStatement: "I added a card. Your turn."})
    this.addShakeClass()

    this.removeCardFromComputerHand(computerCard)
  }

  updateStraightCardGroupLastComputer = (commonCardGroup, computerCard) => {
    let newCardGroup = commonCardGroup.concat(computerCard)
    console.log(commonCardGroup)
    console.log(newCardGroup)
    let newCommonCardGroups = this.state.cardGroups.filter(group=> group !== commonCardGroup)
    let newStraightGroup = this.state.straightGroups.filter(group=> group !== commonCardGroup)
    this.setState({cardGroups: newCommonCardGroups.concat([newCardGroup])})
    this.setState({straightGroups: newStraightGroup.concat([newCardGroup])})
    computerdrawarray.push("found")
    this.setState({computerStatement: "I added a card. Your turn."})

    this.addShakeClass()
    this.setState({computerScore: this.state.computerScore+1})
    this.removeCardFromComputerHand(computerCard)
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

    uniqueByColorAndNumber = (array) => {
      let storage = []
      let newArray = []
      array.forEach(card=>
        {if (!storage.includes(card.number+card.color)) {
          storage.push(card.number+card.color)
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
            this.setState({computerStatement: "I submitted my cards. Your turn."})
            this.addShakeClass()
            this.rummiSpeak("I submitted my cards. Your turn.")
          }
          this.toggleDoneButton(true)
          this.toggleDrawButton(false)}
        }

        highlightGroup = (e) => {
          console.log(e.target)
        }

        knowCard = (card) => {
          console.log("I KNOW THE CARD", card)
          this.setState({draggedCard: card})
        }
        handleClickOfCommonCard = (group) =>{
          console.log("I KNOW THE GROUP", group)
          console.log("I STILL KNOW THE CARD", this.state.draggedCard)
          let card = this.state.draggedCard
          // figure out how to do this function with drag and drop
          let commonCardGroup = group

          if (this.state.draggedCard){
            let selectedCard = card
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
            this.setState({draggedCard:{}})

          }

          updateColorCardGroup = (cardGroup, card) => {
            let newCardGroup = cardGroup.concat(card)
            console.log(cardGroup)
            console.log(newCardGroup)
            let newCommonCardGroups = this.state.cardGroups.filter(group=> group !== cardGroup)
            let newColorGroup = this.state.colorGroups.filter(group=> group !== cardGroup)
            this.setState({cardGroups: newCommonCardGroups.concat([newCardGroup])})
            this.setState({colorGroups: newColorGroup.concat([newCardGroup])})
            this.setState({playerScore: this.state.playerScore+1})
            this.removeCardFromPlayerHand(card)
            this.setState({playerCardGroup: []})
          }

          updateNumberGroupComputer = (cardGroup, card) => {
            let newCardGroup = cardGroup.concat(card)
            console.log(cardGroup)
            console.log(newCardGroup)
            let newCommonCardGroups = this.state.cardGroups.filter(group=> group !== cardGroup)
            let newColorGroup = this.state.colorGroups.filter(group=> group !== cardGroup)
            this.setState({cardGroups: newCommonCardGroups.concat([newCardGroup])})
            this.setState({colorGroups: newColorGroup.concat([newCardGroup])})
            this.setState({computerScore: this.state.computerScore+1})
            computerdrawarray.push("found")
            this.setState({computerStatement: "I added a card. Your turn."})
            this.addShakeClass()
            this.removeCardFromComputerHand(card)
          }

          updateStraightCardGroupLast = (cardGroup, card) => {
            let newCardGroup = cardGroup.concat(card)
            console.log(cardGroup)
            console.log(newCardGroup)
            let newCommonCardGroups = this.state.cardGroups.filter(group=> group !== cardGroup)
            let newStraightGroup = this.state.straightGroups.filter(group=> group !== cardGroup)
            this.setState({cardGroups: newCommonCardGroups.concat([newCardGroup])})
            this.setState({straightGroups: newStraightGroup.concat([newCardGroup])})
            this.setState({playerScore: this.state.playerScore+1})
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
            this.setState({playerScore: this.state.playerScore+1})
            this.removeCardFromPlayerHand(card)
            this.setState({playerCardGroup: []})
          }

          onCardMouseEnter = (e) => {
            e.target.id = "highlight"
          }

          highlight = (e) => {
            console.log(e.target)
            e.target.id = "highlight1"
          }

          onCardMouseLeave = (e) => {
            if (e.target.id !== "highlight1") {
              e.target.id = ""}
            }

            handleClickOfSort = () => {
              //sort state of playerCards
              let byColor = this.state.playerCards.sort((a, b) => a.color.localeCompare(b.color) || a.number - b.number)
              this.setState({playerCards: byColor})
            }

            //stretch: break up groups
            //if straight or color group is greater than 3
            //if you click a group and two or more of your cards afterwards
            // if it makes an approved group
            // remove from card group and remove from hand

            //stretch: break up groups
            //if click end of commoncard
            //if common card group >3
            // if common card and your cards make valid group
            // remove from commoncard from common card group and remove your cards from hand
            // and create new common group

            render() {
              return (
                <>
                <img id="playRummi" src={require("../images/logo.png")}/>
                <div class="grid-container">
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
                    onDropOfGroup={this.handleClickOfCommonCard}
                    highlightGroup={this.highlightGroup}
                    />
                  <PlayerContainer
                    playerCards={this.state.playerCards}
                    onClickOfCard={this.handleClickOfCard}
                    onCardMouseEnter={this.onCardMouseEnter}
                    onCardMouseLeave={this.onCardMouseLeave}
                    highlight={this.highlight}
                    knowCard={this.knowCard}
                    />
                  <Button
                    onClickOfCheck={this.handleClickOfCheck}
                    onClickOfClear={this.clearGroup}
                    onClickOfDone={this.handleClickOfDone}
                    onClickOfDraw={this.handleClickOfDraw}
                    onClickOfSort={this.handleClickOfSort}
                    />
                </div>
                </>
            )
          }
        }

        export default PlayingField
