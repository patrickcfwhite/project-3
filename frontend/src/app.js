// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
// import axios from 'axios'

// libraries
import { TweenMax, TimelineLite, Power2 } from 'gsap'
// import Panzoom from 'panzoom'
import moment from 'moment'
// import axios from 'axios'

// components
import HomePage from './components/components/HomePage'
import NavBar from './components/components/NavBar'
import Cook from './components/components/Cook'
import Watch from './components/components/Watch'
import Register from './components/components/Login'
import Profile from './components/components/Profile'
import Game from './components/components/Game'
import SingleFilm from './components/components/SingleFilm'

import WatchForm from './components/components/forms/WatchForm'




const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/cook' component={Cook}></Route>
      <Route exact path='/watch' component={Watch}></Route>
      <Route exact path='/game' component={Game}></Route>
      <Route exact path='/register' component={Register}></Route>
      <Route path='/user/:id' component={Profile}></Route>
      <Route exact path='/add' component={AddItem}></Route>
      <Route exact path='/watch/:id' component={SingleFilm}></Route>
    </Switch>
  </Router>
)


class AddItem extends React.Component {
  constructor() {
    super()
    this.myRef = React.createRef()
    this.state = {
      isSelectActive: false,
      submitObject: {
        name: ''
      }
    }
  }

  HandleOpen() {
    const t1 = new TimelineLite
    const { isSelectActive } = this.state

    if (!isSelectActive) {
      t1
        .to('.subcat', 0.1, { display: 'block' })
        .to('.subcat', 0.4, { opacity: 1 })
      this.setState({ isSelectActive: true })
    } else {
      t1
        .to('.subcat', 0.4, { opacity: 0 })
        .to('.subcat', 0.1, { display: 'none' })
      this.setState({ isSelectActive: false })
    }
  }

  HandleOptions(e) {
    const value = e.target.id
    this.myRef.current.innerHTML = value

    const t1 = new TimelineLite
    t1
      .to('.subcat', 0.1, { display: 'none' })
      .to('.category-select', 0.7, { transform: 'translate(0, 0)' },'+=0.5')
      .to('.add-form', 0.1, { display: 'block' })
      .to('.add-form', 0.4, { opacity: 1 })
      .to('form', 0.3, { opacity: 1 })
    this.setState({ isSelectActive: false })
  }

  HandleChange() {
    const submitObject = ({ ...this.state.submitObject, [event.target.name]: event.target.value })
    this.setState({ submitObject })
  }


  render() {
    console.log(this.state.submitObject)
    const { current } = this.myRef

    return (
      <main>
        <div className='add-container'>
          <div className="category-select">
            <h1> Please select your item category </h1>
            <div className='options'>
              <h4 ref={this.myRef} > Choose... </h4>
              <ul>
                <li onClick={(e) => this.HandleOptions(e)} id='Cook'> Cook </li>
                <li onClick={(e) => this.HandleOptions(e)} id='Game'> Game </li>
                <li onClick={(e) => this.HandleOptions(e)} id='Read'> Read </li>

                <li onClick={(e) => this.HandleOpen(e)} className="watch"> Watch
                  <li className='subcat' onClick={(e) => this.HandleOptions(e)} id='Film'>Film</li>
                  <li className='subcat' onClick={(e) => this.HandleOptions(e)} id='TV Series'> TV Series</li>
                </li>
              </ul>
            </div>

          </div>

          <div className="add-form">
            <form onChange={(e) => this.HandleChange(e)} action="">
              {current ? (current.innerHTML === 'Film' || current.innerHTML === 'TV Series') ?
                <WatchForm current={this.myRef} /> : null : null}
              <button> SUBMIT </button>
            </form>


          </div>
        </div>
      </main>

    )
  }
}

export default AddItem

ReactDOM.render(
  <App />,
  document.getElementById('root')
)