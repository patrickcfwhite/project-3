// Your backend starts here..
import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import 'bulma'
import './styles/style.scss'

import { TweenMax, TimelineLite, Power1 } from 'gsap'

// components
import HomePage from '../components/HomePage'
import NavBar from '../components/NavBar'

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
    </Switch>
  </Router>

)



ReactDOM.render(
  <App />,
  document.getElementById('root')
)