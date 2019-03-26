import React from 'react'
import {Link} from 'react-router-dom'

const Instructions = () => {
  return (
    <div className="home container">
    <div className="ui inverted vertical masthead center aligned segment" id="hey">
    <div className="ui text container" id="woot">
    <img className="rulesImage" src={require("../images/rules.png")} />
    <div class="ui vertical steps">
    <div class="completed step">
    <i class=""></i>
    <div class="content">
    <div class="title">Select Cards to Create a Group</div>
    <div class="description ">1. Each group must have three or more cards.</div>
    <div class="description ">2. The groups must be valid.</div>
    </div>
    </div>
    <div class="completed step">
    <i class=""></i>
    <div class="content">
    <div class="title">Valid Groups</div>
    <div class="somethin">
    <div class="description">A <strong>three</strong> or <strong>four-of-a-kind</strong> is a set of either three or four tiles of the
    same number in different colors.</div>
    <img src={require("../images/numberGroup.png")} />
    <div class="description">A <strong>straight</strong> is a set of three or more consecutive numbers,
    all in the same color. The number 1 is always played
    as the lowest number; it cannot follow the number 13.</div>
    <img src={require("../images/straightGroup.png")} />
     </div>
    </div>
    </div>
    <div class="completed step">
    <div class="content">
    <div class="title">Add a Card to a Group</div>
    <div class="description">1. You can add individual cards to groups if they satisfy the requirements.</div>
    <div class="description">2. First, select a card. Then, select a Group.</div>
    </div>
    </div>
    <div class="completed step">
    <i class=""></i>
    <div class="content">
    <div class="title">Point System</div>
    <div class="description">You get 1 point for each card you put down.</div>
    <div class="description">First one to get to 30 points wins.</div>
    </div>
    </div>
    </div>
    <div className="ui huge buttons">
    <Link to={`/`}>
    <div className="ui button" id="homeButton">
    Home
    </div>
    </Link>
    <div className="or"></div>
    <Link to={`/game`}>
    <div className="ui button" id="playButton">
    Play Game
    </div>
    </Link>
    </div>

    </div>
    </div>
    </div>
  )
}

export default Instructions
