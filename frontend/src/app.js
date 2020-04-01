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
      singleBookComments: [],
      savedItems: []
    }
  }
  componentDidMount() {
    const id = this.props.history.currentBook
    const savedItems = []
    axios.get('/api/read')
      .then(response => {
        this.setState({ books: response.data })
      })
    axios.get(`/api/read/${id}`)
      .then(response => {
        this.setState({ singlebook: response.data, singleBookComments: response.data.comments })
      })
    axios.get(`/api/user/${auth.getUserId()}`)
      .then(response => {
        response.data.savedItems.map(el => {
          savedItems.push(el[0])
        })
        this.setState({ savedItems })
      })
  }

  // single book information
  HandleSingleBook(e) {
    let { currentBook } = this.props.history
    let id
    e.target.tagName === 'IMG' ?
      id = e.target.parentNode.id : id = e.target.id
    currentBook = id
    axios.get(`/api/read/${currentBook}`)
      .then(response => {
        this.setState({ singlebook: response.data, singleBookComments: response.data.comments })
      })
  }

  // post new comment
  HandleNewComment(e) {
    e.preventDefault()
    const id = this.state.singlebook._id
    let rating = 0
    const stars = Array.from(e.target.parentNode.previousSibling.lastChild.childNodes)

    stars.map(el => {
      el.style.color === 'gold' ? rating = rating + 1 : null
    })

    stars.map(el => {
      el.style.color = 'white'
    })

    const reqBody = {
      text: e.target.firstChild.value,
      rating: rating
    }

    axios.post(`/api/read/${id}/comments`,
      reqBody, { headers: { Authorization: `Bearer ${auth.getToken()}` } })

    e.target.firstChild.value = ''
    setTimeout(() => {
      axios.get(`/api/read/${id}`)
        .then(response => {
          this.setState({ singlebook: response.data, singleBookComments: response.data.comments })
        })
    },750)
  }

  HandleFavourite(e) {
    const id = this.state.singlebook._id
    const t1 = new TimelineLite
    if (e.target.style.color === 'white') {
      e.target.style.color = 'red'
      t1
        .to('.book-heart', 0.2, { opacity: 0.95 })
        .to('.book-heart', 0.5, { opacity: 0 }, '+=1')
      axios.post(`api/read/${id}`, {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    } else {
      e.target.style.color = 'white'
      axios.delete(`/api/user/${auth.getUserId()}/savedItems/read/${id}`
        , { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    }
  }

  handlegold(e) {
    e.target.style.color === 'white' ? e.target.style.color = 'gold' 
      : e.target.style.color = 'white'
  }


  render() {
    const { singleBookComments, singlebook, savedItems } = this.state
    // console.log(singlebook)

    return (
      <main>
        <div className='book-pageContainer'>
          <div className="book-slider">
            {this.state.books.map(book => {
              return <div className='book-item' key={book._id}>
                <div id={book._id} onMouseEnter={(e) => this.HandleSingleBook(e)} className='book'>
                  <img src={book.image} />
                  <h4>{book.author}</h4>
                </div>
              </div>
            })}
          </div>


          {/* single book */}
          <div className='single-book-container'>
            <div className="book-information">
              <h1>{singlebook.title}</h1>
              <ion-icon onClick={(e) => this.HandleFavourite(e)}
                style={savedItems.includes(singlebook._id) ? { color: 'red',animation: 'none' } : { color: 'white',animation: 'none' }}
                name="heart-sharp"></ion-icon>
              <div className="book-heart"> <p>FAVOURITED!</p> </div>
              <section>
                <h2> Rating: {'\u00A0'} {singlebook.rating}</h2>
                <h3> Book Type:{'\u00A0'} {singlebook.bookType}</h3>
              </section>
              <h2> Genre: {'\u00A0'}  {singlebook.genre}</h2>
              <p> <span>Plot: </span> <br /> {singlebook.description}</p>
              <small> Added By: {auth.isLoggedIn() ? <Link to={`/user/${singlebook.user}`}> {singlebook._id} </Link> : 
                'Please login to view the uploader\'s profile'} </small>
            </div>


            {/* comments */}
            <div className='book-comments'>
              <h5 style={{ fontSize: '13.5px' }}> {singlebook.comments ? singleBookComments.length : '0'} COMMENT(S) </h5>
              <div className="previous-book-comment">
                {this.state.singlebook.comments ? this.state.singlebook.comments.map(comment => {
                  return <div key={comment._id} className="book-comment-row">

                    <section>
                      <h3> {comment.user.username} </h3>
                      <h5 className='rating'> Rating: {comment.rating}
                        <ion-icon style={{ transform: 'translate(-5px, -7px)', fontSize: '16px', color: 'gold',animation: 'none' }}
                          name="star-sharp"></ion-icon> </h5>

                    </section>

                    <p> {comment.text} </p>

                    <h5> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>
                  </div>

                })
                  : null}
              </div>


              {/* new comment */}
              <div className="new-comment">
                <div className='star'>
                  {auth.isLoggedIn() ?
                    <div className='comment-section'>
                      <h6 style={{ fontSize: '13px', transform: 'translate(0, 3px)' }}>COMMENT</h6>
                    </div> : <h6>PLEASE LOGIN/REGISTER TO COMMENT</h6>}


                  <div className="star-icons">
                    <ion-icon onClick={(e) => this.handlegold(e)}style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>
                    <ion-icon onClick={(e) => this.handlegold(e)}style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>
                    <ion-icon onClick={(e) => this.handlegold(e)}style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>
                    <ion-icon onClick={(e) => this.handlegold(e)}style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>
                    <ion-icon onClick={(e) => this.handlegold(e)}style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>

                  </div>
                </div>
                {auth.isLoggedIn() ?
                  <div className="book-comment-input">
                    <form onSubmit={(e) => this.HandleNewComment(e)} action="">
                      <input placeholder='Write here...'></input>
                      <button style={{ marginBottom: '1px' }}> POST </button>
                    </form>
                  </div> : null}
              </div>
            </div>
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



