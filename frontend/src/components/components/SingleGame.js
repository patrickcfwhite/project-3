import React from 'react'
import moment from 'moment'
import auth from '../../../../backend/lib/auth'
import axios from 'axios'

const SingleGame = ({ RenderComments, singleGame, singleGameComments, isCommentsActive, HandleOpen, HandleClose, Rotate, props }) => {

  // console.log('hello', isCommentsActive)

  const HandleCommentSubmit = (e) => {
    e.preventDefault()
    const id = props.history.currentGame
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

    axios.post(`/api/play/${id}/comments`, 
      reqBody, { headers: { Authorization: `Bearer ${auth.getToken()}` } })

    e.target.firstChild.value = ''

    setTimeout(() => {
      RenderComments()
    }, 1000)
   
  }

  const HandleStar = (e) => {
    const style = e.target.style
    style.color = 'gold'

  }

  return (
    <div className="gameinfo">
      {/* single game */}
      <div className="game-description">
        <h1 className='info'> {singleGame.title} </h1>
        <h6 className='info'> {singleGame.subcategory} </h6>
        <p className='info'> Description: < br /> {singleGame.description} </p>
      </div>

      <div className="game-comments">
        <button onClick={isCommentsActive ? HandleClose : HandleOpen}>
          {singleGame.comments ? singleGameComments.length : '0'} COMMENTS <ion-icon onClick={Rotate} name="arrow-up-circle-outline"></ion-icon> </button>

        <div className="previous-comments">
          {singleGame.comments ?
            singleGameComments.map((comment) => {
              return (
                <div key={comment._id} className="comment-row">

                  <section>
                    <h3> {comment.user.username} </h3>
                    <h5 className='rating'> Rating: {comment.rating} 
                      <ion-icon style={{ color: 'gold', fontSize: '17px', animation: 'none', transform: 'translate(0, -6.5px)'}} name="star-sharp"></ion-icon> </h5>
                  </section>

                  <p> {comment.text} </p>

                  <h5> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>

                </div>
              )
            })
            : null}
        </div>


        <div className="user-comment">
          <div className='star' style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <h6> {auth.isLoggedIn() ? 'COMMENT' : 'PLEASE LOGIN/REGISTER TO COMMENT'} </h6>
            <div className="star-icons" style={{transform: 'translate(-85px, -11.7px)'}}>
              <ion-icon onClick={(e) => HandleStar(e)} name="star-sharp"></ion-icon>
              <ion-icon onClick={(e) => HandleStar(e)} name="star-sharp"></ion-icon>
              <ion-icon onClick={(e) => HandleStar(e)} name="star-sharp"></ion-icon>
              <ion-icon onClick={(e) => HandleStar(e)} name="star-sharp"></ion-icon>
              <ion-icon onClick={(e) => HandleStar(e)} name="star-sharp"></ion-icon>
            </div>
          </div>
          

          {auth.isLoggedIn() ?
            <div className="comment-input">
              <form action="" onSubmit={(e) => HandleCommentSubmit(e)}>
                <input placeholder='Write here...'></input>
                <button style={{ marginBottom: '1px' }}> POST </button>
              </form>
            </div> : null}
        </div>
      </div>
    </div>
  )
}

export default SingleGame