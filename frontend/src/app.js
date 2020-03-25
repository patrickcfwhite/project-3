// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

// libraries
// import { TweenMax, TimelineLite, Power1 } from 'gsap'
// import Panzoom from 'panzoom'

// components
import HomePage from './components/components/HomePage'
import NavBar from './components/components/NavBar'
import Cook from './components/components/Cook'
import Watch from './components/components/Watch'

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/cook' component={Cook}></Route>
      <Route exact path='/watch' component={Watch}></Route>
      <Route exact path='/game' component={Game}></Route>
    </Switch>
  </Router>
)

class Game extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <>

        {/* <object style={{ height: '90vh', width: '75vw' }} type="text/html" data="https://patrickcfwhite.github.io/project-1/"></object> */}
      
      <main>
        <div className="game-container">
          <div className="gamelist">
          </div>
          <div className="gameinfo"></div>
        </div>
      </main>
      </>

    )
  }

}




ReactDOM.render(
  <App />,
  document.getElementById('root')
)