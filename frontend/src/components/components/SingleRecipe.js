import React from 'react'
import axios from 'axios'
import moment from 'moment'
import auth from '../../../../backend/lib/auth'
import { TimelineLite } from 'gsap'
import { Link } from 'react-router-dom'
// import { set } from 'mongoose'

// import { SingleEntryPlugin } from 'webpack'



class SingleRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      recipe: [],
      singleRecipeComments: [],
      isCommentsActive: false,
      savedItems: []
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    const savedItems = []
    axios.get(`/api/cook/${id}`)
      .then(response => {
        this.setState({ recipe: response.data, singleRecipeComments: response.data.comments })

      })
    axios.get(`/api/user/${auth.getUserId()}`)
      .then(response => {
        response.data.savedItems.map(el => {
          savedItems.push(el[0])
        })
        this.setState({ savedItems })
      })
  }

  HandleOpenRecipeComments(e) {
    const t1 = new TimelineLite
    t1
      .to('.to-hide, .rec-media', 0.5, { opacity: 0 })
      .to('.to-hide, .rec-media', 0.1, { display: 'none' })
      .to('.left-top', 0.1, { height: '10%' })
      .to('.single-rec-comments', 1.5, { height: '90%' })
      .to('.single-previous-rec-comments, .user-rec-comment', 0.1, { display: 'block' })
      .to('.single-previous-rec-comments, .user-rec-comment', 0.5, { opacity: 1 })

    this.setState({ isCommentsActive: true })
  }

  HandleCloseRecipeComments(e) {
    const t1 = new TimelineLite
    t1
      .to('.single-previous-rec-comments, .user-rec-comment', 0.5, { opacity: 0 })
      .to('.single-previous-rec-comments, .user-rec-comment', 0.1, { display: 'none' })
      .to('.single-rec-comments', 1.5, { height: '5%' })
      .to('.left-top', 0.1, { height: '30%' })
      .to('.to-hide', 0.1, { display: 'block' })
      .to('.rec-media', 0.1, { display: 'flex' })
      .to('.to-hide, .rec-media', 0.5, { opacity: 1 })
    this.setState({ isCommentsActive: false })
  }

  Rotate(e) {
    this.state.isCommentsActive ? e.target.name = 'arrow-up-circle-outline' :
      e.target.name = 'arrow-down-circle-outline'
  }

  HandleStar(e) {
    if (e.target.style.color === 'black') {
      e.target.style.color = 'gold'
    } else {
      e.target.style.color = 'black'
    }
  }

  HandleCross(e) {
    if (e.target.style.color === 'black') {
      e.target.style.color = 'brown'
      e.target.style.textDecoration = 'line-through'
    } else {
      e.target.style.textDecoration = 'none'
      e.target.style.color = 'black'
    }
  }

  HandleFavourite(e) {
    const id = this.state.recipe._id
    const t1 = new TimelineLite
    if (e.target.style.color === 'black') {
      e.target.style.color = 'red'
      t1
        .to('.rec-heart', 0.2, { opacity: 0.9 })
        .to('.rec-heart', 0.5, { opacity: 0 }, '+=1')
      axios.post(`/api/cook/${id}`, {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    } else {
      e.target.style.color = 'black'
      axios.delete(`/api/user/${auth.getUserId()}/savedItems/cook/${id}`
        , { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    }
  }

  HandleCommentSubmit(e) {
    e.preventDefault()
    const id = this.state.recipe._id
    console.log(id)
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

    axios.post(`/api/cook/${id}/comments`,
      reqBody, { headers: { Authorization: `Bearer ${auth.getToken()}` } })

    e.target.firstChild.value = ''

    setTimeout(() => {
      axios.get(`/api/cook/${id}`)
        .then(response => {
          this.setState({ recipe: response.data, singleRecipeComments: response.data.comments })
        })
    }, 750)
  }

  HandleDelete(e) {
    const id = this.state.recipe._id
    axios.delete(`/api/cook/${id}/comments/${e.target.previousSibling.id}`,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    setTimeout(() => {
      axios.get(`/api/cook/${id}`)
        .then(response => {
          this.setState({
            recipe: response.data,
            singleRecipeComments: response.data.comments
          })
        })
    }, 500)
  }

  render() {

    const { user, savedItems, recipe, singleRecipeComments, isCommentsActive } = this.state
    console.log(user)
    return (
      <main>
        <div className="single-rec-container">
          <small className='to-hide'> Added By: {auth.isLoggedIn() && recipe.user ? <Link style={{textTransform: 'capitalize'}}to={`/user/${recipe.user._id}`}> {recipe.user.username} </Link> :
            null } </small>
          <ion-icon onClick={() => this.props.history.push('/cook')}
            style={{ color: 'white', position: 'absolute', right: '3%', top: '7.5%', animation: 'none' }}
            name="close-circle-sharp"></ion-icon>
          <div className="single-rec-left">

            <div className="left-top">
              <h1 style={{ width: '83%' }}> {recipe.title} </h1>
              <div className="rec-heart"> <p>FAVOURITED!</p> </div>
              {auth.isLoggedIn() ? <ion-icon style={savedItems.includes(recipe._id) ?
                { color: 'red', position: 'absolute', right: '39%', animation: 'none' } :
                { color: 'black', position: 'absolute', right: '39%', animation: 'none' }}
              onClick={(e) => this.HandleFavourite(e)} name="heart-sharp"></ion-icon> : null}
              <h6 className='to-hide' style={{ color: 'brown' }}> {recipe.description} </h6>
              <p className='to-hide' > Serves: {recipe.serves} <span> Prep: {recipe.prepTime} </span> Cook: {recipe.cookTime} </p>
            </div>
            <div className="rec-media">

              <div className="media-left">
                <h6> {recipe.ingredients ? recipe.ingredients.length : null}  Ingredients: </h6>
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

            <div className="single-rec-comments">
              <button onClick={(e) => isCommentsActive ? this.HandleCloseRecipeComments(e) : this.HandleOpenRecipeComments(e)}>
                {recipe.comments ? singleRecipeComments.length : '0'} COMMENTS <ion-icon onClick={(e) => this.Rotate(e)} name="arrow-up-circle-outline"></ion-icon> </button>
              <div className="single-previous-rec-comments">
                {!recipe.comments ? null :

                  singleRecipeComments.map((comment => {
                    return (
                      <div key={comment.user.username} className="rec-comment-row">

                        <section>
                          <Link style={{ color: 'black' }} to={`/user/${comment.user._id}`}> <h5> {comment.user.username} </h5> </Link>
                          <h6 className='rec-rating'> Rating: {comment.rating}
                            <ion-icon style={{ color: 'gold', fontSize: '17px', animation: 'none', transform: 'translate(0, -6.5px)' }} name="star-sharp"></ion-icon>
                          </h6>
                        </section>

                        <p> {comment.text} </p>

                        <h6 id={comment._id}> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h6>
                        {auth.getUserId() === comment.user._id ? <ion-icon onClick={(e) => this.HandleDelete(e)} style={{
                          position: 'absolute', right: '3%', bottom: '13.5%',
                          fontSize: '18px', animation: 'none'
                        }} name="trash-bin"></ion-icon> : null}
                      </div>
                    )
                  }))

                }
              </div>
              <div className="user-rec-comment">
                <div className='star' style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h6> {auth.isLoggedIn() ? 'COMMENT' : 'PLEASE LOGIN/REGISTER TO COMMENT'} </h6>
                  <div className="star-icons" style={{ transform: 'translate(-85px, -11.7px)' }}>
                    <ion-icon style={{ fontSize: '21px' }}onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    <ion-icon style={{ fontSize: '21px' }}onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    <ion-icon style={{ fontSize: '21px' }}onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    <ion-icon style={{ fontSize: '21px' }}onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                    <ion-icon style={{ fontSize: '21px' }}onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                  </div>
                </div>

                {!auth.isLoggedIn() ? null :
                  <div className="rec-comment-input">
                    <form onSubmit={(e) => this.HandleCommentSubmit(e)} style={{ height: '80%', width: '90%' }} action="">
                      <input style={{ height: '100%' }} placeholder='Write here...'></input>
                      <button style={{ marginBottom: '1px' }}> POST </button>
                    </form>
                  </div>
                }

              </div>
            </div>


          </div>

          <div className="single-rec-right">
            {recipe.length === 0 ? null :
              <ol>
                METHOD:
                {recipe.method.map((el, i) => {
                  return (
                    <li style={{ color: 'black' }} onClick={(e) => this.HandleCross(e)} key={i}> {el} </li>
                  )
                })}
              </ol>}
          </div>

        </div>

      </main>
    )
  }
}

export default SingleRecipe