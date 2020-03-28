import React from 'react'

const Watch = () => {
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
          <div className="top-films"></div>
          <div className="top-films"></div>
          <div className="top-films"></div>
        </div>




        {/* this is the horizontal scroll movie section  */}

        <h3 style={{ margin: ' 15px 5px' }}> TRENDING NOW </h3>



        <div className="inner-wrapper">



          <video id='video' className="box"
            poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
            onMouseOver={(e) => {
              e.target.setAttribute('src',
                'https://movietrailers.apple.com/movies/marvel/black-widow/black-widow-trailer-3_i320.m4v#t=6')
              e.target.play()
            }}
            onMouseOut={(e) => e.target.setAttribute('src', '')}
            src=''
          />
          <video id='video' className="box"
            poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
            onMouseOver={(e) => {
              e.target.setAttribute('src',
                'https://imdb-video.media-imdb.com/vi3619684633/1434659607842-pgv4ql-1564585734687.mp4?Expires=1585389682&Signature=ozlb9MGHvSeRYRhWbsijp~x7uiOsXwgqNeT8Z1KA~pm~PaNNy3jsLrWRi2RbtiEaG9QEhTV7920p-fP95Xmyd-EtAp5Q6kcEeYdwhohtF6g4At2Rmc6qQZkis5ii-h~~CI0WUxXFv0AXHvjFaTS~6xOzP-304zzYBeUwPWZEu9fBPsQ0Fh3L4u42s5oxSVPGo2KGMGjzfOant4JyY9Cdkxv0j2byLBTqk3gwTaAnTjrN-RJqWwDMeyOuFys1U3H3TSlUcIQvehRdJyLKytiVmKZzwaef9XVcA9tD0Srtjvla6iZ38qr9JZ6rN7j078MrZTmGn11j9Hao3lMKHBuIQw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA#t=10')
              e.target.play()
            }}
            onMouseOut={(e) => e.target.setAttribute('src', '')}
            src=''
          />
          <video id='video' className="box"
            poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
            onMouseOver={(e) => {
              e.target.setAttribute('src',
                'https://movietrailers.apple.com/movies/paramount/sonic-the-hedgehog/sonic-the-hedgehog-trailer-1b_h1080p.mov#t=6')
              e.target.play()
            }}
            onMouseOut={(e) => e.target.setAttribute('src', '')}
            src=''
          />
          <video id='video' className="box"
            poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
            onMouseOver={(e) => {
              e.target.setAttribute('src',
                'https://movietrailers.apple.com/movies/paramount/sonic-the-hedgehog/sonic-the-hedgehog-trailer-1b_h1080p.mov#t=6')
              e.target.play()
            }}
            onMouseOut={(e) => e.target.setAttribute('src', '')}
            src=''
          />
          <video id='video' className="box"
            poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
            onMouseOver={(e) => {
              e.target.setAttribute('src',
                'https://movietrailers.apple.com/movies/paramount/sonic-the-hedgehog/sonic-the-hedgehog-trailer-1b_h1080p.mov#t=6')
              e.target.play()
            }}
            onMouseOut={(e) => e.target.setAttribute('src', '')}
            src=''
          />
          <video id='video' className="box"
            poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
            onMouseOver={(e) => {
              e.target.setAttribute('src',
                'https://movietrailers.apple.com/movies/paramount/sonic-the-hedgehog/sonic-the-hedgehog-trailer-1b_h1080p.mov#t=6')
              e.target.play()
            }}
            onMouseOut={(e) => e.target.setAttribute('src', '')}
            src=''
          />
          <video id='video' className="box"
            poster='https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg'
            onMouseOver={(e) => {
              e.target.setAttribute('src',
                'https://movietrailers.apple.com/movies/paramount/sonic-the-hedgehog/sonic-the-hedgehog-trailer-1b_h1080p.mov#t=6')
              e.target.play()
            }}
            onMouseOut={(e) => e.target.setAttribute('src', '')}
            src=''
          />




        </div>

      </div>



    </main>
  )
}

export default Watch