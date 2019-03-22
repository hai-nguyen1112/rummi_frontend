import React, {Component} from 'react'
import './App.css'
import PlayingField from './containers/PlayingField'

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
