import React from 'react'
// import Panzoom from 'panzoom'
import axios from 'axios'
import { TimelineLite, Power4 } from 'gsap'
import moment from 'moment'
import auth from '../../../../backend/lib/auth'

class Cook extends React.Component {

  constructor() {
    super()
    // this.myRef = React.createRef()
    this.state = {
      recipes: [],
      singleRecipe: [],
      singleRecipeComments: [],
      isCommentsActive: false,
      savedItems: []
    }
  }

  componentDidMount() {
    const savedItems = []
    axios.get('/api/cook')
      .then(response => {
        this.setState({ recipes: response.data })
        console.log(response.data)
      })
    axios.get(`/api/user/${auth.getUserId()}`)
      .then(response => {
        response.data.savedItems.map(el => {
          savedItems.push(el[0])
        })
        this.setState({ savedItems })
      })
  }

  HandleExpansion(e) {

    const i = e.target
    let query = ''
    const others = []
    let id = ''

    if (i.parentNode.id === 'recipe-card') {
      return
    } else if (i.parentNode.className === 'card-image' || i.parentNode.className === 'card-info') {
      id = e.target.parentNode.parentNode
    } else if (i.parentNode.className === 'card-info-bottom' || i.tagName === 'LI') {
      id = e.target.parentNode.parentNode.parentNode
    }
    console.log(id)

    this.state.recipes.map(other => {
      if (other.title.replace(/\W/g, '') !== id.className) {
        others.push('.' + other.title.replace(/\W/g, ''))
      } else {
        query = other._id
      }
    })

    // get the single item clicked
    axios.get(`/api/cook/${query}`)
      .then(response => {
        this.setState({ singleRecipe: response.data, singleRecipeComments: response.data.comments })
      })

    const t1 = new TimelineLite
    t1
      .to('.card-image, .card-info', 0.5, { opacity: 0 })
      .to(others, 0.2, { opacity: 0 }, '-=0.3')
      .to(id, 0.2, { opacity: 0 }, '-=0.3')
      .to(others, 0.4, { display: 'none' }, '+=0.1')
      .to('.recipe-container', 0.1, { paddingTop: 0 })
      .to(id, 0.1, { backgroundColor: 'rgba(173, 161, 161, 0.822)' }, '+=0.1')
      .to(id, 0.4, { opacity: 1 }, '+=0.1')
      .to(id, 0.2, { height: '83vh' }, '+=0.3')
      .to(id, 0.4, { width: '100%' }, '+=0.3')
      .to(id, 0.3, { display: 'none' }, '+=0.3')
      .to('.single', 0.1, { display: 'flex' })
      .to('.single-left, .single-middle', 1, { opacity: 1, stagger: 0.3 })
  }

  HandleCollapse(e) {
    const others = []
    let id = e.target.parentNode

    this.state.recipes.map(other => {
      other.title.replace(/\W/g, '') !== id.id.replace(/\W/g, '') ? others.push('.' + other.title.replace(/\W/g, '')) : null
    })

    if (others.length === 14) {
      id = '.' + id.id.replace(/\W/g, '')
      const t1 = new TimelineLite
      t1
        .to('.single-left, .single-middle', 1, { opacity: 0 })
        .to('.single', 0.2, { display: 'none' }, '+=0.5')
        .to(id, 0.1, { display: 'flex' })
        .to(id, 0.4, { width: '15.8vw' }, '+=0.2')
        .to(id, 0.2, { height: '36vh' }, '+=0.5')
        .to(id, 0.2, { opacity: 0 }, '+=0.4')
        .to('.recipe-container', 0.1, { paddingTop: '86vh' }, '+=0.5')
        .to(id, 0.1, { backgroundColor: '#010911' }, '+=0.1')
        .to(others, 0.4, { display: 'flex' }, '+=0.4')
        .to(id, 0.2, { opacity: 1 }, '-=0.3')
        .to(others, 0.2, { opacity: 1 }, '-=0.3')
        .to('.card-image, .card-info', 0.5, { opacity: 1 })
      this.setState({ isCommentsActive: false })
    }
  }

  HandleOpenRecipeComments(e) {
    console.log(e.target.childNode)
    const t1 = new TimelineLite
    t1
      .to('.to-hide, .recipe-mid-section', 0.5, { opacity: 0 })
      .to('.to-hide, .recipe-mid-section', 0.2, { display: 'none' })
      .to('.recipe-top-section', 0.1, { height: '10%' })
      .to('.recipe-comments', 1, { height: '85%' })
      .to('.previous-recipe-comments', 0.1, { display: 'block' })
      .to('.user-recipe-comment', 0.1, { display: 'block' }, '-=0.65')
    this.setState({ isCommentsActive: true })
  }

  HandleCloseRecipeComments() {
    const t1 = new TimelineLite
    t1
      .to('.user-recipe-comment', 0.1, { display: 'none' }, '-=0.65')
      .to('.previous-recipe-comments', 0.1, { display: 'none' })
      .to('.recipe-comments', 1, { height: '5%' })
      .to('.recipe-top-section', 0.1, { height: '30%' })
      .to('.recipe-mid-section', 0.1, { display: 'flex' })
      .to('.to-hide', 0.1, { display: 'block' })
      .to('.to-hide, .recipe-mid-section', 0.5, { opacity: 1 })
    this.setState({ isCommentsActive: false })
  }

  HandleCross(e) {
    if (e.target.style.textDecoration === 'line-through') {
      e.target.style.textDecoration = ''
      e.target.style.color = 'black'
    } else {
      e.target.style.textDecoration = 'line-through'
      e.target.style.color = 'brown'
    }
  }

  Rotate(e) {
    console.log(e.target.name)
    this.state.isCommentsActive ?
      e.target.name = 'arrow-up-circle-outline' : e.target.name = 'arrow-down-circle-outline'
  }

  HandleStar(e) {
    const style = e.target.style
    style.color = 'gold'
  }

  HandleCommentSubmit(e) {
    e.preventDefault()
    const id = this.state.singleRecipe._id
    let rating = 0
    const stars = Array.from(e.target.parentNode.previousSibling.lastChild.childNodes)

    stars.map(el => el.style.color === 'gold' ? rating = rating + 1 : null)

    stars.map(el => el.style.color = 'black')

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
          this.setState({ singleRecipe: response.data, singleRecipeComments: response.data.comments })
        })
    }, 1000)
  }

  HandleFavourite(e) {
    const id = this.state.singleRecipe._id
    const t1 = new TimelineLite
    if (e.target.style.color === 'black') {
      e.target.style.color = 'red'
      t1
        .to('.recipe-heart-message', 0.2, { opacity: 0.9 })
        .to('.recipe-heart-message', 0.5, { opacity: 0 }, '+=1')
      axios.post(`/api/cook/${id}`, {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    } else {
      e.target.style.color = 'black'
      axios.delete(`/api/user/${auth.getUserId()}/savedItems/cook/${id}`
        , { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    }

  }


  render() {
    const { singleRecipe, savedItems, singleRecipeComments, isCommentsActive } = this.state
    return (

      <main >
        <div className="recipe-container">
          <div className="recipe-row">
            {this.state.recipes.map(dish => {
              return (
                <div onClick={(e) => this.HandleExpansion(e)}
                  className={dish.title.replace(/\W/g, '')} key={dish._id} id="recipe-card">

                  <div className="card-image">
                    <img src={dish.image} />
                    <ul>
                      {dish.dietary.map((diet, i) => {
                        return <li className='recipe-items' key={i}> {diet !== 'none' ? diet : null} </li>
                      })}
                    </ul>
                  </div>

                  <div className="card-info">
                    {dish.title.length < 45 ?
                      <h1> {dish.title} </h1> :
                      <h3> {dish.title} </h3>
                    }
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className="card-info-bottom">
                      <h5 className='recipe-items'> <ion-icon name="people-sharp"></ion-icon> {dish.serves} </h5>
                      <small> <ion-icon name="color-fill-sharp"></ion-icon> {dish.cookTime} </small>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* single recipe */}
            <div id={this.state.singleRecipe.title} className="single" >
              <ion-icon name="close-circle-sharp" onClick={(e) => this.HandleCollapse(e)}
                style={{ animation: 'none', color: 'white', position: 'absolute', right: '-20px', top: '-20px' }}></ion-icon>
              <div className="single-left">

                <div className='recipe-top-section'>

                  <h1 style={{ textTransform: 'capitalize' }}> {singleRecipe.title}
                    <div className="recipe-heart-message"> <p>FAVOURITED!</p> </div>
                    {auth.isLoggedIn() ? <ion-icon
                      style={savedItems.includes(singleRecipe._id) ? { color: 'red' } : { color: 'black' }}
                      onClick={(e) => this.HandleFavourite(e)}
                      name="heart-sharp"></ion-icon> : null}
                  </h1>


                  <h3 style={{ marginBottom: '10px', color: 'brown' }} className='to-hide'> {singleRecipe.description} </h3>
                  <p className='to-hide'> Serves: {singleRecipe.serves}  <span> Prep: {singleRecipe.prepTime} </span>  Cook: {singleRecipe.cookTime}</p>
                </div>

                <h5 className='to-hide'> {singleRecipe.length === 0 ? null : singleRecipe.ingredients.length} Ingredients: </h5>


                <div className="recipe-mid-section">

                  {singleRecipe.length === 0 ? null : <ul className='to-hide'>
                    {singleRecipe.ingredients.map((el, i) => {
                      return <li key={i}> - {'\u00A0'} {el} </li>
                    })}
                  </ul>}

                  <div className="food-pic">
                    <img src={singleRecipe.image}></img>
                  </div>

                </div>

                <div className="recipe-comments">
                  <button onClick={(e) => isCommentsActive ? this.HandleCloseRecipeComments(e) : this.HandleOpenRecipeComments(e)}>
                    {singleRecipe.comments ? singleRecipeComments.length : '0'} COMMENTS <ion-icon onClick={(e) => this.Rotate(e)} name="arrow-up-circle-outline"></ion-icon> </button>
                  <div className="previous-recipe-comments">
                    {!this.state.singleRecipe.comments ? null :

                      singleRecipeComments.map((comment => {
                        return (
                          <div key={comment.user} className="recipe-comment-row">

                            <section>
                              <h3> {comment.user} </h3>
                              <h6 className='recipe-rating'> Rating: {comment.rating}
                                <ion-icon style={{ color: 'gold', fontSize: '17px', animation: 'none', transform: 'translate(0, -6.5px)' }} name="star-sharp"></ion-icon>
                              </h6>
                            </section>

                            <p> {comment.text} </p>

                            <h6> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h6>

                          </div>
                        )
                      }))

                    }
                  </div>

                  <div className="user-recipe-comment">
                    <div className='star' style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h6> {auth.isLoggedIn() ? 'COMMENT' : 'PLEASE LOGIN/REGISTER TO COMMENT'} </h6>
                      <div className="star-icons" style={{ transform: 'translate(-85px, -11.7px)' }}>
                        <ion-icon onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                        <ion-icon onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                        <ion-icon onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                        <ion-icon onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                        <ion-icon onClick={(e) => this.HandleStar(e)} name="star-sharp"></ion-icon>
                      </div>
                    </div>

                    {!auth.isLoggedIn() ? null :
                      <div className="recipe-comment-input">
                        <form onSubmit={(e) => this.HandleCommentSubmit(e)} style={{ height: '80%', width: '90%' }} action="">
                          <input style={{ height: '100%' }} placeholder='Write here...'></input>
                          <button style={{ marginBottom: '1px' }}> POST </button>
                        </form>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="single-middle">
                {singleRecipe.length === 0 ? null :
                  <ol>
                    <h3> METHOD: </h3>
                    {singleRecipe.method.map((el, i) => {
                      return <li className='methods' onClick={(e) => this.HandleCross(e)} key={i}> {el} </li>
                    })}
                  </ol>}
              </div>

            </div>

          </div>
        </div>

      </main >

    )
  }
}

export default Cook