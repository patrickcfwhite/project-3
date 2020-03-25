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
import ReactPlayer from 'react-player'
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

      <div className="main-container">

        <video className="jumbotron-video"
          muted='muted'
          onLoadedMetadata={e => e.target.play()}
          src='https://movietrailers.apple.com/movies/wb/the-way-back/the-way-back-trailer-1_h1080p.mov#t=6'
        />

        <div className="inner-wrapper">

          <video id='video' className="box"
            poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
            onMouseOver={(e) => {
              e.target.setAttribute('src',
                'https://movietrailers.apple.com/movies/paramount/sonic-the-hedgehog/sonic-the-hedgehog-trailer-1b_h1080p.mov#t=6,130')
              e.target.play()
            }}
            onMouseOut={(e) => e.target.setAttribute('src', '')}
            src=''
          />




        </div>

      </div>



    </main>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)