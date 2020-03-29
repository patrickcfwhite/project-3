import React from 'react'
import moment from 'moment'
import axios from 'axios'


class SingleFilm extends React.Component {
  constructor() {
    super()
    this.state = {
      film: [],
      comment: ''
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/watch/${id}`)
      .then(response => {
        this.setState({ film: response.data })
      })
  }

  HandleState(e) {
    this.setState({ comment: e.target.value })
  }

  HandleCommentSubmit(e) {
    const id = this.props.match.params.id
    // e.preventDefault()
    console.log('submitted')
    axios.post(`/api/watch/${id}/comments`)
  }

  render() {
    console.log(this.state.comment)
    const { film } = this.state

    return (
      <main>
        <div className="single-film-container">

          <div className="single-film-left">
            <div className="single-film-title">
              <h1> {film.title} </h1>
              <h3>{film.description}</h3>
              <p> Certificate: {film.certification} <span> Director: {film.director} </span> Duration: {film.duration} </p>
            </div>

            <div className="single-film-media">
              <img src={film.image} alt="" />
              <video style={{ opacity: '0.9' }} controls onClick={e => e.target.play()} src={film.trailer + '#t=10'} />

            </div>
          </div>

          <div className="film-right">
            <div className="film-comments">
              <h3> {film.comments ? film.comments.length : '0'} COMMENTS</h3>
              <div className="previous-film-comments">
                {
                  film.comments ?
                    film.comments.map(comment => {
                      return (
                        <div key={comment._id} className="film-comment-row">
                          <section>
                            <h3> {comment.user} </h3>
                            <h5 className='rating'> Rating: {comment.rating} </h5>
                          </section>
                          <p> {comment.text} </p>
                          <h5> Posted {moment(comment.createdAt).startOf('second').fromNow()} </h5>
                        </div>
                      )
                    }) : null}
              </div>

              <div className="film-user-comment">
                <h4> LEAVE A COMMENT </h4>


                <form onSubmit={(e) => this.HandleCommentSubmit(e)} onChange={(e) => this.HandleState(e)} style={{ width: '100%' }} action="">
                  <input placeholder='Write here...'></input>
                  <button style={{ marginBottom: '1px' }}> POST </button>
                </form>

              </div>
            </div>


          </div>


        </div>
      </main>

    )
  }
}

export default SingleFilm
