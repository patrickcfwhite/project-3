// Your frontend starts here..

import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bulma'
import './styles/style.scss'
import axios from 'axios'
import './styles/book.scss'
import './styles/style.scss'
import auth from '../../backend/lib/auth'

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
import Login from './components/components/Login'
import Profile from './components/components/Profile'
import Game from './components/components/Game'
import SingleFilm from './components/components/SingleFilm'
import SingleRecipe from './components/components/SingleRecipe'
import AddItem from './components/components/AddItem'


import test from './components/components/test'
import EditCookForm from './components/components/forms/EditCookForm'
// import LoginModal from './components/components/Login'


const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/cook' component={Cook}></Route>
      <Route exact path='/watch' component={Watch}></Route>
      <Route exact path='/play' component={Game}></Route>
      <Route exact path='/read' component={Read}></Route>
      <Route exact path='/register' component={Register}></Route>
      {/* <Route exact path='/login' component={LoginModal}></Route> */}
      <Route path='/user/:id/uploads/:category/:id' component={EditCookForm}></Route>
      <Route path='/user/:id' component={Profile}></Route>
      <Route exact path='/add' component={AddItem}></Route>
      <Route exact path='/watch/:id' component={SingleFilm}></Route>
      <Route exact path='/cook/:id' component={SingleRecipe}></Route>
      <Route exact path='/test' component={test}></Route>

    </Switch>
  </Router>
)

class Read extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
      singlebook: {},
      comments: []
    }
  }
  componentDidMount() {
    axios.get('/api/read')
      .then(res => {
        this.setState({
          books: res.data,
          comments: res.data.map(book => {
            return book.comments
          })
        })
      })
  }

  handleBookTitle(e) {
    const t1 = new TimelineLite
    let id
    e.target.tagName === 'IMG' ? id = '#' + e.target.nextSibling.id : null
    // console.log(e.target)
    // console.log(e.target.nextSibling)
    t1
      .to(id, 0.1, { display: 'block' })


  }

  handleBookTitleOut(e) {
    const t1 = new TimelineLite
    let id
    e.target.tagName === 'IMG' ? id = '#' + e.target.nextSibling.id : null
    t1
      .to(id, 0.1, { display: 'none' })
  }


  // single book information
  getSingleBook(e) {
    const id = e.target.id
    axios.get(`/api/read/${id}`)
      .then(res => {
        this.setState({ singlebook: res.data })
        const t1 = new TimelineLite
        t1
          .to('ion-icon', 0.1, { opacity: 1 })
          .to('small', 0.1, { opacity: 1 })
        console.log(this.state.singlebook)
      })

  }

  // post new comment
  handleNewComment(e) {
    e.preventDefault()
    const rating = 2
    const reqbody = {
      rating: rating,
      text: e.target.firstChild.value
    }
    axios.post(`/api/read/${this.state.singlebook._id}/comments`, reqbody,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    setTimeout(() => {
      axios.get(`/api/read/${this.state.singlebook._id}`)
        .then(res => {
          this.setState({ singlebook: res.data })
        })
    }, 2000)
  }


  render() {

    return <main>
      <div className='book-pageContainer'>
        <div className="book-slider">
          {this.state.books.map(book => {
            return <div className='book-item' key={book._id}>
              <div
                className='book'
                onMouseEnter={(e) => this.handleBookTitle(e)}
                onMouseOut={(e) => this.handleBookTitleOut(e)}>
                <img src={book.image} />
                <div className='book-title' id={book.description.replace(/\W/g, '')}>
                  <h2>Author: {book.author}</h2>
                </div>
              </div>
              <div className='book-link'>
                <div id={`${book._id}`} onClick={(e) => this.getSingleBook(e)}>More Info</div>
              </div>
            </div>
          })}
        </div>
        <div className='book-info'>
          <div className="book-information">
            <div className="book-header">
              <div className='singlebook-information'>
                <h1>{this.state.singlebook.title}</h1>
                <div className="book-rating">
                  <p>{this.state.singlebook.rating}</p>
                  <ion-icon style={{ animation: 'none', opacity: 0 }}></ion-icon>
                </div>
              </div>
              <h2>{this.state.singlebook.genre}</h2>
              <h3>{this.state.singlebook.bookType}</h3>
            </div>
            <div className='book-plot'>
              <small style={{ opacity: 0 }}> Plot: {this.state.singlebook.description}</small>
            </div>
            <small className='book-uploader'> {this.state.singlebook.user}</small>
          </div>
          <div className='all-book-comments'>
            {/* previous comments */}
            <div className="previous-book-comments">
              {this.state.singlebook.comments ? this.state.singlebook.comments.map(comment => {
                return <div key={comment._id} className="comment-row">

                  <section>
                    <h3> {comment.username} </h3>
                    <h5 className='rating'> Rating: {comment.rating} </h5>
                  </section>

                  <p> {comment.text} </p>

                  <h5> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>

                </div>

              })
                : null}
            </div>






            {/* new comment */}
            {auth.isLoggedIn() ? <div className="user-comment">
              <h6>COMMENT</h6>

              <div className="comment-input">
                <form onSubmit={(e) => this.handleNewComment(e)}>
                  <input placeholder='Write here...'></input>

                  <button id={this.state.singlebook.id} style={{ marginBottom: '1px' }}> POST </button>
                </form>
              </div>
            </div> 
              : <h6>PLEASE LOGIN/REGISTER TO COMMENT</h6>}
          </div>
        </div>
      </div>
    </main>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)



