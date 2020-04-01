import React from 'react'
import auth from '../../../../backend/lib/auth'
const HomePage = () => {
  auth.isLoggedIn()
  return (

    <main>
      <div className='title'>
        <img src='https://images.unsplash.com/photo-1514894780887-121968d00567?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80' />
        <div className='title-text'>
          <h1> Looking for Inspiration?</h1>
          <h2>We bring you ideas from mouth-watering  < br /> recipes to encapsulating  novels to help < br /> make those days a bit more special </h2>
        </div>
      </div>
    </main>

  )

}

export default HomePage