// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'

// libraries
import { TweenMax, TimelineLite, Power2 } from 'gsap'
// import Panzoom from 'panzoom'
import moment from 'moment'

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
      singleGame: [],
      singleGameComments: [],
      isCommentsActive: false
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
        // console.log(response.data.comments[0].user)
        this.setState({ singleGame: response.data, singleGameComments: response.data.comments })
      })
  }


  HandleOpen() {
    const t1 = new TimelineLite()
    t1
      // (selector, duration, {css properties}, animationDelay) 
      .to('.game-row', 0.1, { display: 'none', ease: Power2.easeOut, stagger: 0.1 })
      .to('.gamelist', 1, { width: 0, ease: Power2.easeOut })
      .to('.gameinfo', 0.4, { width: '100%', ease: Power2.easeOut })
      .to('.game-comments', 0.5, { width: '55%', ease: Power2.easeOut }, '-=0.3')
      .to('.game-comments', 0.5, { height: '100%', ease: Power2.easeOut })
      .to('.comment-row', 0.5, { opacity: 1, ease: Power2.easeOut, stagger: 0.1 })
      .to('.user-comment', 0.2, { opacity: 1, ease: Power2.easeOut }, '-=0.6')
    this.setState({ isCommentsActive: true })
  }

  HandleClose() {
    const t1 = new TimelineLite()
    t1
      // (selector, duration, {css properties}, animationDelay)
      .to('.comment-row', 0.5, { opacity: 0, ease: Power2.easeOut, stagger: 0.1 })
      .to('.user-comment', 0.06, { opacity: 0, ease: Power2.easeOut }, '-=0.45')
      .to('.game-comments', 0.7, { height: '10%', ease: Power2.easeOut })
      .to('.game-comments', 0.4, { width: '100%', ease: Power2.easeOut })
      .to('.gameinfo', 0.7, { width: '60%', ease: Power2.easeIn }, '-=0.2')
      .to('.gamelist', 0.7, { width: '40%', ease: Power2.easeOut }, '-=0.2')
      .to('.game-row', 0.1, { display: 'flex', ease: Power2.easeOut, stagger: 0.1 })
    this.setState({ isCommentsActive: false })
  }

  render() {

    return (
      <>

        {/* <object style={{ height: '90vh', width: '75vw' }} type="text/html" data="https://patrickcfwhite.github.io/project-1/"></object> */}

        <main style={{ position: 'relative' }}>
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
                    {game.link ? <button> Play Now </button> : null}
                  </div>
                )
              })}

            </div>


            <div className="gameinfo">
              {/* single game */}
              <div className="game-description">
                <h1 className='info'> {this.state.singleGame.title} </h1>
                <h6 className='info'> {this.state.singleGame.subcategory} </h6>
                <p className='info'> Description: {this.state.singleGame.description} </p>
              </div>

              <div className="game-comments">
                <button onClick={() => this.state.isCommentsActive ? this.HandleClose() : this.HandleOpen()}>
                  {this.state.singleGameComments.length} COMMENTS </button>

                <div className="previous-comments">
                  {this.state.singleGameComments.map((comment) => {
                    return (
                      <div key={comment._id} className="comment-row">

                        <section>
                          <h3> {comment.user} </h3>
                          <h5 className='rating'> Rating: {comment.rating} </h5>
                        </section>

                        <p> {comment.text} </p>

                        <h5> Posted {moment(comment.createdAt).startOf('minute').fromNow()} </h5>

                      </div>
                    )
                  })}
                </div>


                <div className="user-comment">
                  <h6> COMMENT </h6>

                  <div className="comment-input">
                    <input placeholder='Write here...'></input>

                    <button style={{ marginBottom: '1px' }}> POST </button>
                  </div>

                </div>
              </div>
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