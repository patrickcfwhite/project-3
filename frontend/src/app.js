// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
// import { Player } from 'video-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import 'bulma'
import './styles/style.scss'
// import video1 from '../images/avengers'

// libraries
import { TweenMax, TimelineLite, Power1 } from 'gsap'
// import Panzoom from 'panzoom'

// components
import HomePage from './components/components/HomePage'
import NavBar from './components/components/NavBar'
import Cook from './components/components/Cook'

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/cook' component={Cook}></Route>
      <Route exact path='/watch' component={Watch}></Route>
    </Switch>
  </Router>
)

const Watch = () => {
  return (
    <main>
      <div className="inner-wrapper">

        <video
          poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
          onMouseOver={e => e.target.play()}
          onMouseOut={e => e.target.load()}
          src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
        />

      </div>


    </main>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)