import React from 'react'
import axios from 'axios'
import { TimelineLite, Power2 } from 'gsap'
import moment from 'moment'
import SingleGame from './SingleGame'


class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      games: [],
      singleGame: [],
      singleGameComments: [],
      isCommentsActive: false
    }
  }

  componentDidMount() {
    const id = this.props.history.currentGame

    axios.get(`/api/play/${id}`)
      .then(response => {
        // console.log(response.data.comments[0].user)
        this.setState({ singleGame: response.data, singleGameComments: response.data.comments })
      })

    axios.get('/api/play')
      .then(response => {
        this.setState({ games: response.data })
        // console.log(response.data)
      })
  }

  RenderComments() {
    const id = this.props.history.currentGame
    axios.get(`/api/play/${id}`)
      .then(response => {
        // console.log(response.data.comments[0].user)
        this.setState({ singleGame: response.data, singleGameComments: response.data.comments })
      })
  }

  HandleGameInfo(e) {

    const id = e.target.id
    this.props.history.currentGame = id

    axios.get(`/api/play/${id}`)
      .then(response => {
        // console.log(response.data.comments[0].user)
        this.setState({ singleGame: response.data, singleGameComments: response.data.comments })
      })
  }


  HandleOpen() {
    const t1 = new TimelineLite()
    t1
      // (selector, duration, {css properties}, animationDelay) 
      .to('.game-row', 0.1, { display: 'none', ease: Power2.easeOut })
      .to('.gamelist', 1, { width: 0, ease: Power2.easeOut })
      .to('.gameinfo', 0.4, { width: '100%', ease: Power2.easeOut })
      .to('.game-comments', 0.5, { width: '55%', ease: Power2.easeOut }, '-=0.3')
      .to('.game-comments', 0.5, { height: '100%', ease: Power2.easeOut })
      .to('.comment-row', 0.5, { opacity: 1, ease: Power2.easeOut, stagger: 0.1 })
      .to('.user-comment', 0.2, { opacity: 1, ease: Power2.easeOut }, '-=0.6')
    this.setState({ isCommentsActive: true })
  }

  HandleClose() {
    const t1 = new TimelineLite()
    t1
      // (selector, duration, {css properties}, animationDelay)
      .to('.comment-row', 0.5, { opacity: 0, ease: Power2.easeOut, stagger: 0.1 })
      .to('.user-comment', 0.06, { opacity: 0, ease: Power2.easeOut }, '-=0.45')
      .to('.game-comments', 0.7, { height: '10%', ease: Power2.easeOut })
      .to('.game-comments', 0.4, { width: '100%', ease: Power2.easeOut })
      .to('.gameinfo', 0.7, { width: '60%', ease: Power2.easeIn }, '-=0.2')
      .to('.gamelist', 0.7, { width: '40%', ease: Power2.easeOut }, '-=0.2')
      .to('.game-row', 0.1, { display: 'flex', ease: Power2.easeOut, stagger: 0.06 })
    this.setState({ isCommentsActive: false })
  }

  Rotate(event) {
    // console.log(event.target.name)
    if (this.state.isCommentsActive) {
      event.target.name = 'arrow-up-circle-outline'
    } else {
      event.target.name = 'arrow-down-circle-outline'
    }
  }

  render() {

    return (
      <>

        {/* <object style={{ height: '90vh', width: '75vw' }} type="text/html" data="https://patrickcfwhite.github.io/project-1/"></object> */}

        <main style={{ position: 'relative' }}>
          <div className="game-container">


            <div className="gamelist">

              {this.state.games.map(game => {
                return (
                  <div key={game._id} id={game._id} className="game-row"
                    onMouseEnter={(e) => this.HandleGameInfo(e)}>
                    <div>
                      <h1> {game.title} </h1>
                      <p> {game.subcategory} </p>
                    </div>
                    {game.link ?  <a href={game.link} target='blank_target'> <button> Play Now </button> </a>  : null}
                  </div>
                )
              })}

            </div>

            <SingleGame
              singleGame={this.state.singleGame}
              singleGameComments={this.state.singleGameComments}
              isCommentsActive={this.state.isCommentsActive}
              RenderComments={() => this.RenderComments()}
              HandleClose={() => this.HandleClose()}
              HandleOpen={() => this.HandleOpen()}
              Rotate={() => this.Rotate(event)}
              props={this.props}
            />

          </div>
        </main>
      </>

    )
  }
}

export default Game 