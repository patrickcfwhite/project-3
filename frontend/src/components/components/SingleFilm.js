import React from 'react'
import moment from 'moment'
import axios from 'axios'
import auth from '../../../../backend/lib/auth'
import { TimelineLite } from 'gsap'
import { Link } from 'react-router-dom'


class SingleFilm extends React.Component {
  constructor() {
    super()
    this.state = {
      film: [],
      savedItems: [],
      average: 0
    }
  }

  updateRating(input, userRating) {
    const ratingArray = Array.from(input)
    return ratingArray.length === 0 ? userRating.toPrecision(2) : (ratingArray.reduce((acc, cur) => acc + cur.rating, userRating) / (ratingArray.length + 1)).toPrecision(2)
  }

  componentDidMount() {
    const savedItems = []
    const id = this.props.match.params.id
    axios.get(`/api/watch/${id}`)
      .then(response => {
        console.log(response.data.rating)
        const avg = this.updateRating(response.data.comments, response.data.rating)
        console.log(avg)
        this.setState({ film: response.data, average: avg })
      })
    axios.get(`/api/user/${auth.getUserId()}`)
      .then(response => {
        response.data.savedItems.map(el => {
          savedItems.push(el[0])
        })
        this.setState({ savedItems })
      })
  }

  HandleState(e) {
    this.setState({ comment: e.target.value })
  }

  HandleCommentSubmit(e) {
    e.preventDefault()
    const id = this.props.match.params.id
    let rating = 0
    const stars = Array.from(e.target.previousSibling.lastChild.childNodes)

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

    axios.post(`/api/watch/${id}/comments`,
      reqBody, { headers: { Authorization: `Bearer ${auth.getToken()}` } })

    e.target.firstChild.value = ''

    setTimeout(() => {
      axios.get(`/api/watch/${id}`)
        .then(response => {
          const avg = this.updateRating(response.data.comments, response.data.rating)
          this.setState({ film: response.data, average: avg })
          // console.log(response.data)
        })
    }, 1000)

  }

  HandleStar(e) {
    if (e.target.style.color === 'white') {
      e.target.style.color = 'gold'
    } else {
      e.target.style.color = 'white'
    }
  }

  HandleFavourite(e) {

    const id = this.props.match.params.id
    const t1 = new TimelineLite
    if (e.target.style.color === 'white') {
      e.target.style.color = 'red'
      t1
        .to('.film-heart-message', 0.2, { opacity: 0.9 })
        .to('.film-heart-message', 0.5, { opacity: 0 }, '+=1')
      axios.post(`/api/watch/${id}`, {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    } else {
      e.target.style.color = 'white'
      axios.delete(`/api/user/${auth.getUserId()}/savedItems/watch/${id}`
        , { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    }
  }

  HandleDelete(e) {
    const id = this.state.film._id
    axios.delete(`/api/watch/${id}/comments/${e.target.previousSibling.id}`,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    setTimeout(() => {
      axios.get(`/api/watch/${id}`)
        .then(response => {
          const avg = this.updateRating(response.data.comments)
          this.setState({ film: response.data, average: avg })
        })
    }, 500)
  }

  render() {
    if (!this.state.film.user) return null

    const { id } = this.props.match.params
    const { film, savedItems, average } = this.state
    const { user } = this.state.film
    const starStyle = {
      color: 'white',
      animation: 'none',
      fontSize: '19.5px',
      opacity: '0.85',
      transform: 'translate(0, 6px)'
    }

    const titletop = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }

    return (
      <main className='single-film'>
        <div className="single-film-container">

          <div className="single-film-left">
            <div className="single-film-title">
              <div style={titletop} className="film-title-top">
                <h1> {film.title} {'\u00A0'} {average === 'NaN' ? null : <small style={{ color: 'lightseagreen', fontSize: '14.5px' }}> Average User Rating: {average}</small>}  </h1>
                <div className="film-heart-message"> <p>FAVOURITED!</p> </div>
                {auth.isLoggedIn() ? <ion-icon
                  style={savedItems.includes(id) ? { color: 'red', animation: 'none', transform: 'translate(-50px, -5px)' }
                    : { color: 'white', animation: 'none', transform: 'translate(-50px, -5px)' }}
                  onClick={(e) => this.HandleFavourite(e)} name="heart-sharp"></ion-icon> : null}
              </div>

              <h3>{film.description}</h3>
              <p> Certificate: {film.certification} <span> Director: {film.director} </span> Duration: {film.duration}</p>
            </div>

            <div className="single-film-media">
              <img src={film.image} alt="" />
              {!film.trailer ? null :
                <video style={{ opacity: '0.9' }} controls onClick={e => e.target.play()} src={film.trailer + '#t=10'} />
              }
              <small> Added By: {auth.isLoggedIn() ? <Link style={{textTransform: 'capitalize'}}to={`/user/${user._id}`}> {user.username} </Link> :
                'Please login to view the uploader\'s profile'} </small>
            </div>

          </div>

          <div className="film-right">
            <div className="film-comments">
              <h3> {film.comments ? film.comments.length : '0'} COMMENT(S)</h3>
              <div className="previous-film-comments">
                {
                  film.comments ?
                    film.comments.map(comment => {
                      return (
                        <div key={comment._id} className="film-comment-row">
                          <section>
                            <h3><Link to={`/user/${comment.user._id}`}>{comment.user.username}</Link></h3>
                            <h5 className='rating'> Rating: {comment.rating} </h5>
                            <ion-icon style={{ color: 'gold', fontSize: '16px', animation: 'none', transform: 'translate(0, -2px)' }} name="star-sharp"></ion-icon>
                          </section>
                          <p> {comment.text} </p>
                          <h5 id={comment._id}> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>
                          {auth.getUserId() === comment.user._id ? <ion-icon onClick={(e) => this.HandleDelete(e)} style={{
                            position: 'absolute', right: 0, bottom: '21.5%',
                            fontSize: '18px', animation: 'none'
                          }} name="trash-bin"></ion-icon> : null}
                        </div>
                      )
                    }) : null}
              </div>

              <div className="film-user-comment">

                <div className='star' style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4> {auth.isLoggedIn() ? 'COMMENT' : 'PLEASE LOGIN/REGISTER TO COMMENT'} </h4>
                  {!auth.isLoggedIn() ? null :
                    <div className="star-icons" style={{ transform: 'translate(-85px, -11.7px)' }}>
                      <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                      <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                      <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                      <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                      <ion-icon style={starStyle} onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    </div>
                  }
                </div>

                {!auth.isLoggedIn() ? null :
                  <form onSubmit={(e) => this.HandleCommentSubmit(e)} onChange={(e) => this.HandleState(e)} style={{ width: '100%' }} action="">
                    <input placeholder='Write here...'></input>
                    <button style={{ marginBottom: '1px' }}> POST </button>
                  </form>
                }


              </div>
            </div>


          </div>


        </div>
      </main>

    )
  }
}

export default SingleFilm
