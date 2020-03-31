import React from 'react'
import axios from 'axios'
import moment from 'moment'
import auth from '../../../../backend/lib/auth'
import { TimelineLite } from 'gsap'

// import { SingleEntryPlugin } from 'webpack'



class SingleRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      recipe: [],
      singleRecipeComments: [],
      isCommentsActive: false
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/cook/${id}`)
      .then(response => {
        this.setState({ recipe: response.data, singleRecipeComments: response.data.comments })

      })
  }

  HandleOpenRecipeComments(e) {
    const t1 = new TimelineLite
    t1
      .to('.to-hide, .rec-media', 0.5, { opacity: 0 })
      .to('.to-hide, .rec-media', 0.1, { display: 'none' })
      .to('.left-top', 0.1, {height: '10%'})
      .to('.single-rec-comments', 1.5, {height: '90%'})
      .to('.single-previous-rec-comments, .user-rec-comment', 0.1, {display: 'block'})
      .to('.single-previous-rec-comments, .user-rec-comment', 0.5, {opacity: 1})
  }

  HandleCloseRecipeComments(e) {
    console.log('hello')
  }

  Rotate(e) {
    console.log('hello')
  }

  render() {
    const { recipe, singleRecipeComments, isCommentsActive } = this.state
    console.log(recipe.ingredients)
    return (
      <main>
        <div className="single-rec-container">
          <div className="single-rec-left">

            <div className="left-top">
              <h1> {recipe.title} </h1>
              <h6 className='to-hide' style={{ color: 'brown' }}> {recipe.description} </h6>
              <p className='to-hide' > Serves: {recipe.serves} <span> Prep: {recipe.prepTime} </span> Cook: {recipe.cookTime} </p>
            </div>
            <div className="rec-media">

              <div className="media-left">
                <h6> {recipe.ingredients ? recipe.ingredients.length : null} INGREDIENTS </h6>
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
                      <div key={comment.user} className="rec-comment-row">

                        <section>
                          <h5> {comment._id} </h5>
                          <h6 className='rec-rating'> Rating: {comment.rating}
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
              <div className="user-rec-comment">
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

export default SingleRecipe