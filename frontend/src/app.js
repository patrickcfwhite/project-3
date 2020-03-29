// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bulma'
import './styles/style.scss'
import axios from 'axios'
import './styles/book.scss'

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
// import LoginModal from './components/components/Login'


const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/cook' component={Cook}></Route>
      <Route exact path='/watch' component={Watch}></Route>
      <Route exact path='/game' component={Game}></Route>
      <Route exact path='/read' component={Read}></Route>
      <Route exact path='/register' component={Register}></Route>
      {/* <Route exact path='/login' component={LoginModal}></Route> */}
      <Route path='/user/:id' component={Profile}></Route>
      <Route exact path='/add' component={AddItem}></Route>
      <Route exact path='/watch/:id' component={SingleFilm}></Route>
    </Switch>
  </Router>
)

class Read extends React.Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    axios.get('/api/read')
      .then(res => {
        this.setState({ books: res.data })
        console.log(this.state.books)
      })
  }

  handleBookTitle(e) {
    const t1 = new TimelineLite
    let id
    e.target.tagName === 'IMG' ? id = '.' + e.target.previousSibling.className : null
    t1
      .to(e.target, 0.2, { display: 'none' })
      .to(id, 0.5, { display: 'block', opacity: 1 })
    console.log(id)
  }

  handleBookTitleOut(e) {
    const t1 = new TimelineLite
    let id 
    e.target.tagName === 'IMG' ? id = '.' + e.target.nextSibling.className : null
    t1 
      .to(id, 0.5, { display: 'none', opacity: 0 })
      .to(e.target, 0.2, { display: 'block' })
   
  }



  render() {
    return <main>
      <div className="book-container">
        {this.state.books.map(book => {
          return <div key={book._id} className='book' onMouseEnter={(e) => this.handleBookTitle(e)} onMouseOut={(e) => this.handleBookTitleOut(e)} >
            <div id='overlay' className={book.description.replace(/\W/g, '')}><h2>{book.title}</h2></div>
            <img src={book.image} />
          </div>
        })}

      </div>
    </main>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)