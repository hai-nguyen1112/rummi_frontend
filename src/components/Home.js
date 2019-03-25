import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <body className="home container">
    <div className="ui inverted vertical masthead center aligned segment" id="hey">
    <div className="ui text container">
    <h1 className="ui inverted header">
    RUMMI HOME PAGE
    </h1>
    <div className="ui huge buttons">
    <Link to={`/instructions`}>
    <div className="ui button">
    Instructions
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
    </body>
  )
}

export default Home
