import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <body className="home container">
    <div className="ui inverted vertical masthead center aligned segment" id="hey">
    <div className="ui text container">
    <img className="logoImage" src={require("../images/logo.png")} />
    <img className="rummiImage" src={require('../images/rummi.png')} />
    <div className="ui huge buttons" id="homeButtons">
    <Link to={`/instructions`}>
    <div className="ui button" id="instructionsButton">
    Instructions
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
    </body>
  )
}

export default Home
