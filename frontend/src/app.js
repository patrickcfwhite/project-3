// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'

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
    this.state = {
      games: [],
      singleGame: []
    }
  }

  componentDidMount() {
    axios.get('/api/play')
      .then(response => {
        this.setState({ games: response.data })
        console.log(response.data)
      })
  }

  HandleGameInfo(e) {
    const id = e.target.id

    axios.get(`/api/play/${id}`)
      .then(response => {
        console.log(response.data)
        this.setState({ singleGame: response.data })
      })
  }

  render() {
    return (
      <>

        {/* <object style={{ height: '90vh', width: '75vw' }} type="text/html" data="https://patrickcfwhite.github.io/project-1/"></object> */}

        <main>
          <div className="game-container">
            <div className="gamelist">

              {this.state.games.map(game => {
                return (
                  <div key={game._id} id={game._id} className="game-row" 
                    onMouseEnter={(e) => this.HandleGameInfo(e)}>
                    <div>
                      <h1> {game.title} </h1>
                      <p> {game.subcategory} </p>
                    </div>
                    {game.link ?  <button> Play Now </button> :  null }                     
                  </div>
                )
              })}

            </div>
            <div className="gameinfo">
              {/* single game */}
              <h1> {this.state.singleGame.title} </h1>
              <h6> {this.state.singleGame.subcategory} </h6>
              <p> Description: {this.state.singleGame.description} </p>



            </div>
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