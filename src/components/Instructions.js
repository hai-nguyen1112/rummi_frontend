import React from 'react'
import {Link} from 'react-router-dom'


const Instructions = () => {
  return (
    <div className="home container">
    <div className="ui inverted vertical masthead center aligned segment" id="hey">
    <div className="ui text container" id="woot">
    <h1 className="ui inverted header">
    INSTRUCTION PAGE
    </h1>
    <div class="ui vertical steps">
    <div class="completed step">
    <i class=""></i>
    <div class="content">
    <div class="title">Select Cards to Create a Group</div>
    <div class="description ">1. Each group must have three or more cards.</div>
    <div class="description ">2. Groups must follow these requirements.</div>
    <div class="description ">do this later</div>
    </div>
    </div>
    <div class="completed step">
    <i class=""></i>
    <div class="content">
    <div class="title">Valid Groups</div>
    <div class="description">1. Select a Card.</div>
    <div class="description">2. Select a Group.</div>
    </div>
    </div>
    <div class="completed step">
    <i class="credit card icon"></i>
    <div class="content">
    <div class="title">Add a Card to a Group</div>
    <div class="description">1. Select a Card.</div>
    <div class="description">2. Select a Group.</div>
    </div>
    </div>
    <div class="active step">
    <i class=""></i>
    <div class="content">
    <div class="title">Confirm Order</div>
    <div class="description">Verify order details</div>
    </div>
    </div>
    </div>
    <div className="ui huge buttons">
    <Link to={`/`}>
    <div className="ui button">
    Home
    </div>
    </Link>
    <div className="or"></div>
    <Link to={`/game`}>
    <div className="ui button">
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
