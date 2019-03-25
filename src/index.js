import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Home from './components/Home'
import Instructions from './components/Instructions'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/instructions" component={Instructions} />
      <Route exact path="/game" component={App} />
    </React.Fragment>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
