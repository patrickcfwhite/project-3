import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Watch extends React.Component {

  constructor() {
    super()
    this.state = {
      films: []
    }
  }

  componentDidMount() {
    axios.get('/api/watch')
      .then(response => {
        this.setState({ films: response.data })
      })
  }

  render() {
    console.log(this.state.films)
    return (
      <main className='watch-main'>

        <div className="main-container">

          <div style={{ marginBottom: '50px' }} className="jumbotron">
            <video className="jumbotron-video"
              muted='muted'
              onLoadedMetadata={e => e.target.play()}
              src='https://movietrailers.apple.com/movies/wb/the-way-back/the-way-back-trailer-1_h1080p.mov#t=6,120'
            />

            <div className="jumbotron-title">
              <h1 style={{ fontSize: '40px', letterSpacing: '1px', margin: '20px 5px' }}> THE WAY BACK <span style={{ fontSize: '15px' }}> 2020 </span></h1>
              <p> A troubled man with a formerly promising career in basketball struggles with alcoholism while coaching the basketball team at his old high school.</p>
            </div>

          </div>

          <h3 style={{ margin: ' 15px 5px' }}> TOP FILM RECOMMENDATIONS </h3>

          <div className="inner-wrapper">

            {this.state.films.map(film => {
              if (film.subcategory === 'Film') {
                return (
                  <div className="video-container">
                    <video id='video' className="box"
                      poster={film.image}
                      onMouseOver={(e) => {
                        e.target.setAttribute('src', film.trailer + '#t=6')
                        e.target.play()
                      }}
                      onMouseOut={(e) => e.target.setAttribute('src', '')}
                      src=''
                    />

                    <div className="video-info">
                      <h3> {film.title} </h3>
                     
                      <Link to={`./watch/${film._id}`} > <button> MORE INFO </button> </Link>
                    </div>
                  </div>

                )

              }

            })}

          </div>

          {/* this is the horizontal scroll movie section  */}

          <h3 style={{ margin: ' 15px 5px' }}> TRENDING TV SERIES </h3>

          <div className="inner-wrapper">

            {this.state.films.map(film => {
              if (film.subcategory === 'TV Series') {
                return (
                  <div className="video-container">
                    <video id='video' className="tv-box"
                      poster={film.image}
                      onMouseOver={(e) => {
                        e.target.setAttribute('src', film.trailer + '#t=10')
                        e.target.play()
                      }}
                      onMouseOut={(e) => e.target.setAttribute('src', '')}
                      src=''
                    />
                    <div className="video-info">
                      <h3> {film.title} </h3>
                      <Link to={`./watch/${film._id}`} > <button> MORE INFO </button> </Link>
                    </div>
                  </div>


                )

              }

            })}

          </div>

        </div>



      </main >
    )
  }
}

export default Watch