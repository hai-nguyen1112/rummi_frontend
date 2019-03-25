import React, {Component} from 'react'
import './App.css'
import PlayingField from './containers/PlayingField'
import {Route, Redirect, Switch} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
          <PlayingField />
      </div>
    )
  }
}

export default App
