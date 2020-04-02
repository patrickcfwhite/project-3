import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import auth from '../../../../backend/lib/auth'
import { TimelineLite } from 'gsap'
import moment from 'moment'
import '../../styles/book.scss'


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
    }, 750)
  }

  HandleFavourite(e) {
    const savedItems = []
    const id = this.state.singlebook._id
    const t1 = new TimelineLite
    if (e.target.style.color === 'white') {
      e.target.style.color = 'red'
      t1
        .to('.book-heart', 0.2, { opacity: 0.95 })
        .to('.book-heart', 0.5, { opacity: 0 }, '+=1')
      axios.post(`api/read/${id}`, {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      setTimeout(() => {
        axios.get(`/api/user/${auth.getUserId()}`)
          .then(response => {
            response.data.savedItems.map(el => {
              savedItems.push(el[0])
            })
            this.setState({ savedItems })
          })
      }, 200)

    } else {
      e.target.style.color = 'white'
      axios.delete(`/api/user/${auth.getUserId()}/savedItems/read/${id}`
        , { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      setTimeout(() => {
        axios.get(`/api/user/${auth.getUserId()}`)
          .then(response => {
            response.data.savedItems.map(el => {
              savedItems.push(el[0])
            })
            this.setState({ savedItems })
          })
      }, 200)
    }
  }

  handlegold(e) {
    e.target.style.color === 'white' ? e.target.style.color = 'gold'
      : e.target.style.color = 'white'
  }

  HandleDelete(e) {
    const id = this.state.singlebook._id
    axios.delete(`/api/read/${id}/comments/${e.target.previousSibling.id}`,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    setTimeout(() => {
      axios.get(`/api/read/${id}`)
        .then(response => {
          this.setState({ singlebook: response.data, singleBookComments: response.data.comments })
        })
    }, 500)
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
          {singlebook.title ?
            <div className='single-book-container'>
              <div className="book-information">
                <h1>{singlebook.title}</h1>
                <ion-icon onClick={(e) => this.HandleFavourite(e)}
                  style={savedItems.includes(singlebook._id) ? { color: 'red', animation: 'none' } : { color: 'white', animation: 'none' }}
                  name="heart-sharp"></ion-icon>
                <div className="book-heart"> <p>FAVOURITED!</p> </div>
                <section>
                  <h2> Rating: {'\u00A0'} {singlebook.rating}</h2>
                  <h3> Book Type:{'\u00A0'} {singlebook.bookType}</h3>
                </section>
                <h2> Genre: {'\u00A0'}  {singlebook.genre}</h2>
                <p> <span>Plot: </span> <br /> {singlebook.description}</p>
                <small > Added By: {auth.isLoggedIn() ? <Link style={{ textTransform: 'capitalize' }} to={`/user/${singlebook.user._id}`}> {singlebook.user.username} </Link> :
                  'Please login to view the uploader\'s profile'} </small>
              </div>


              {/* comments */}

              <div className='book-comments'>
                <h5 style={{ fontSize: '13.5px' }}> {singlebook.comments ? singleBookComments.length : '0'} COMMENT(S) </h5>
                <div className="previous-book-comment">
                  {this.state.singlebook.comments ? this.state.singlebook.comments.map(comment => {
                    return <div key={comment._id} className="book-comment-row">

                      <section>
                        <Link style={{ color: 'white' }} to={`/user/${comment.user._id}`} ><h3> {comment.user.username} </h3> </Link>
                        <h5 className='rating'> Rating: {comment.rating}
                          <ion-icon style={{ transform: 'translate(-5px, -7px)', fontSize: '16px', color: 'gold', animation: 'none' }}
                            name="star-sharp"></ion-icon> </h5>

                      </section>

                      <p> {comment.text} </p>

                      <h5 id={comment._id}> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>
                      {auth.getUserId() === comment.user._id ? <ion-icon onClick={(e) => this.HandleDelete(e)} style={{
                        position: 'absolute', right: '1%', bottom: '15%',
                        fontSize: '18px', animation: 'none'
                      }} name="trash-bin"></ion-icon> : null}
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

                    {!auth.isLoggedIn() ? null :
                      <div className="star-icons">
                        <ion-icon onClick={(e) => this.handlegold(e)} style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>
                        <ion-icon onClick={(e) => this.handlegold(e)} style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>
                        <ion-icon onClick={(e) => this.handlegold(e)} style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>
                        <ion-icon onClick={(e) => this.handlegold(e)} style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>
                        <ion-icon onClick={(e) => this.handlegold(e)} style={{ fontSize: '21px', animation: 'none' }} name="star-sharp"></ion-icon>

                      </div>
                    }
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

            : null}
        </div>
      </main>
    )


  }
}

export default Read