import React from 'react'
import moment from 'moment'

const SingleGame = ({ singleGame, singleGameComments, isCommentsActive, HandleOpen, HandleClose, Rotate }) => {

  // console.log('hello', isCommentsActive)

  return (
    <div className="gameinfo">
      {/* single game */}
      <div className="game-description">
        <h1 className='info'> {singleGame.title} </h1>
        <h6 className='info'> {singleGame.subcategory} </h6>
        <p className='info'> Description: < br /> {singleGame.description} </p>
      </div>

      <div className="game-comments">
        <button onClick={isCommentsActive ? HandleClose :  HandleOpen}>
          {singleGame.comments ? singleGameComments.length : '0'} COMMENTS <ion-icon onClick={Rotate} name="arrow-up-circle-outline"></ion-icon> </button>

        <div className="previous-comments">
          {singleGame.comments ?
            singleGameComments.map((comment) => {
              return (
                <div key={comment._id} className="comment-row">

                  <section>
                    <h3> {comment.user} </h3>
                    <h5 className='rating'> Rating: {comment.rating} </h5>
                  </section>

                  <p> {comment.text} </p>

                  <h5> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>

                </div>
              )
            })
            : null}
        </div>


        <div className="user-comment">
          <h6> COMMENT </h6>

          <div className="comment-input">
            <input placeholder='Write here...'></input>

            <button style={{ marginBottom: '1px' }}> POST </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SingleGame