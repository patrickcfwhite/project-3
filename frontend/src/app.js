// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bulma'
import './styles/style.scss'
// import axios from 'axios'

// libraries
// import Panzoom from 'panzoom'
import { TweenMax, TimelineLite, Power2 } from 'gsap'
import moment from 'moment'


// components
import HomePage from './components/components/HomePage'
import NavBar from './components/components/NavBar'
import Cook from './components/components/Cook'
import Watch from './components/components/Watch'
import Register from './components/components/Register'
import Profile from './components/components/Profile'
import Game from './components/components/Game'
import SingleFilm from './components/components/SingleFilm'
import AddItem from './components/components/AddItem'
import axios from 'axios'
import test from './components/components/test'


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
      <Route exact path='/cook/:id' component={SingleRecipe}></Route>
      <Route exact path='/test' component={test}></Route>

    </Switch>
  </Router>
)

class SingleRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      recipe: []
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/cook/${id}`)
      .then(response => {
        this.setState({ recipe: response.data })

      })
  }

  render() {
    const { recipe } = this.state
    console.log(recipe.ingredients)
    return (
      <main>
        <div className="single-rec-container">
          <div className="single-rec-left">

            <div className="left-top">
              <h1> {recipe.title} </h1>
              <h5> {recipe.description} </h5>
              <p> Serves: {recipe.serves} <span> Prep: {recipe.prepTime} </span> Cook: {recipe.cookTime} </p>
            </div>
            <div className="rec-media">
              <h4> INGREDIENTS </h4>
              <div className="media-left">

                {recipe.length === 0 ? null : <ul className='to-hide'>
                  {recipe.ingredients.map((el, i) => {
                    return <li key={i}> - {'\u00A0'} {el} </li>
                  })}
                </ul>}


              </div>
              <div className="media-right">
                <img src={recipe.image} />
              </div>
            </div>

          </div>

          <div className="single-rec-right">
            {recipe.length === 0 ? null :
              <ol>
                METHOD:
                {recipe.method.map((el, i) => {
                  return (
                    <li key={i}> {el} </li>
                  )
                })}
              </ol>}
          </div>

        </div>

      </main>
    )
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)