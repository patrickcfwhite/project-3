import React, { useEffect, useState } from 'react'
import moment from 'moment'
import auth from '../../../../backend/lib/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { TimelineLite } from 'gsap'

const SingleGame = ({ savedItems, RenderComments, singleGame, singleGameComments, isCommentsActive, HandleOpen, HandleClose, Rotate, props }) => {

  const HandleCommentSubmit = (e) => {
    e.preventDefault()
    const id = props.history.currentGame
    console.log(id)
    let rating = 0
    const stars = Array.from(e.target.parentNode.previousSibling.lastChild.childNodes)
    // stars gets the stars in the comment section

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
    }, 500)

  }

  const HandleStar = (e) => {
    if (e.target.style.color === 'white') {
      e.target.style.color = 'gold'
    } else {
      e.target.style.color = 'white'
    }

  }

  const HandleFavourite = (e) => {
    const id = props.history.currentGame
    const t1 = new TimelineLite
    if (e.target.style.color === 'white') {
      e.target.style.color = 'red'
      t1
        .to('.heart-message', 0.2, { opacity: 0.9 })
        .to('.heart-message', 0.5, { opacity: 0 }, '+=1')
      axios.post(`api/play/${id}`, {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      setTimeout(() => {
        RenderComments()
      }, 500)
    } else {
      e.target.style.color = 'white'
      axios.delete(`/api/user/${auth.getUserId()}/savedItems/play/${id}`
        , { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      setTimeout(() => {
        RenderComments()
      }, 500)
    }
  }

  const HandleDelete = (e) => {
    axios.delete(`/api/play/${singleGame._id}/comments/${e.target.previousSibling.id}`,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
    setTimeout(() => {
      RenderComments()
    }, 500)
  }


  return (
    <div className="gameinfo">
      {/* single game */}
      {singleGame.title ?
        <div className="game-description">
          <div className="game-favourite">
            <h1 className='info'> {singleGame.title} </h1>
            <div className="heart-message"> <p>FAVOURITED!</p> </div>
            {auth.isLoggedIn() ? <ion-icon style={savedItems.includes(props.history.currentGame) ? { color: 'red' } : { color: 'white' }}
              onClick={(e) => HandleFavourite(e)} name="heart-sharp"></ion-icon> : null}
          </div>
          <h6 className='info'> {singleGame.subcategory} </h6>
          <h6> {singleGame.players} </h6>
          <p className='info'> Description: < br /> {singleGame.description} </p>
          <small> Added By: {auth.isLoggedIn() ? <Link style={{textTransform:'capitalize'}}to={`/user/${singleGame.user._id}`}> {singleGame.user.username} </Link> :
            'Please login to view the uploader\'s profile'} </small>
        </div>
        : null}

      {singleGame.title ?
        <div className="game-comments">
          <button onClick={isCommentsActive ? HandleClose : HandleOpen}>
            {singleGame.comments ? singleGameComments.length : '0'} COMMENTS <ion-icon onClick={Rotate} name="arrow-up-circle-outline"></ion-icon> </button>

          <div className="previous-comments">
            {singleGame.comments ?
              singleGameComments.map((comment) => {
                console.log(comment)
                return (
                  <div key={comment._id} className="comment-row">

                    <section>
                      <h3> <Link style={{ color: 'white' }} to={`/user/${comment.user._id}`}>   {comment.user.username}   </Link></h3>
                      <h5 style={{ transform: 'translate(0, -11px' }} className='rating'> Rating: {comment.rating}
                        <ion-icon style={{ color: 'gold', fontSize: '17px', animation: 'none', transform: 'translate(0, -6.5px)' }} name="star-sharp"></ion-icon> </h5>
                    </section>

                    <p> {comment.text} </p>

                    <h5 id={comment._id}> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>
                    {auth.getUserId() === comment.user._id ? <ion-icon onClick={(e) => HandleDelete(e)} style={{
                      position: 'absolute', right: 0, bottom: '13%',
                      fontSize: '18px', animation: 'none'
                    }} name="trash-bin"></ion-icon> : null}
                  </div>
                )
              })
              : null}
          </div>


          <div className="user-comment">
            <div className='star' style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <h6> {auth.isLoggedIn() ? 'COMMENT' : 'PLEASE LOGIN/REGISTER TO COMMENT'} </h6>
              <div className="star-icons" style={{ transform: 'translate(-85px, -11.7px)' }}>
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
        : null}
    </div>

  )
}

export default SingleGame