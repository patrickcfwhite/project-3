import React from 'react'
import axios from 'axios'

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


    return (
      <main>

        <div className="main-container">

          <div style={{ marginBottom: '50px' }} className="jumbotron">
            <video className="jumbotron-video"
              muted='muted'
              onLoadedMetadata={e => e.target.play()}
              src='https://movietrailers.apple.com/movies/wb/the-way-back/the-way-back-trailer-1_h1080p.mov#t=6,120'
            />

            <h1 style={{ letterSpacing: '1px', margin: '20px 5px' }}> THE WAY BACK <span style={{ fontSize: '15px' }}> 2020 </span></h1>
            <p> A troubled man with a formerly promising career in basketball struggles with alcoholism while coaching the basketball team at his old high school.</p>
          </div>



          <h3 style={{ margin: ' 15px 5px' }}> TOP 3 RECOMMENDATIONS </h3>
          <div className="top-films-container">

            {this.state.films.map((film, i) => {
              if (i < 5) {
                return (
                  <video key={top._id} className="top-films"
                    poster={film.image}
                    onMouseOver={(e) => {
                      e.target.setAttribute('src', film.trailer + '#t=11')
                      e.target.play()
                    }}
                    onMouseOut={(e) => e.target.setAttribute('src', '')}
                    src=''>
                  </video>
                )
              }
            })}
          </div>


          {/* this is the horizontal scroll movie section  */}

          <h3 style={{ margin: ' 15px 5px' }}> TRENDING NOW </h3>



          <div className="inner-wrapper">

            {this.state.films.map((film, i) => {
              if (i >= 5) {
                return (
                  <video id='video' className="box"
                    poster={film.image}
                    onMouseOver={(e) => {
                      e.target.setAttribute('src', film.trailer + '#t=6')
                      e.target.play()
                    }}
                    onMouseOut={(e) => e.target.setAttribute('src', '')}
                    src=''
                  />
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