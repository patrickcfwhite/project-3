import React, { useState } from 'react'
import { TimelineLite, Power1 } from 'gsap'
import { Link, withRouter } from 'react-router-dom'
import LoginModal from './Login'
import auth from '../../../../backend/lib/auth'

const NavBar = (props) => {
  console.log(auth.isLoggedIn())
  // useState hook, array takes 2 args [stateName, setState]
  const [isOpen, setState] = useState(false)
  const [modalOpen, setModal] = useState(false)

  // from defines starting position to what we currently have rendered on the page, as its final position
  // throw { paused: true } stops animation from happening on page refresh
  const t1 = new TimelineLite()

  // console.log(props)
  const HandleOpen = () => {
    t1
      // (selector, duration, {css properties}, animationDelay) 
      .to('main', 1.5, { width: '52vw', ease: Power1.easeOut })
      .to('.navbar', 1.5, { width: '34vw', ease: Power1.easeOut }, '-=1.5')
      .to('.game-description, .rating', 0.1, { opacity: 0, ease: Power1.easeOut }, '-=1.5')
      .fromTo('.items', 0.7, { display: 'none', opacity: 0, x: -50, ease: Power1.easeOut },
        { display: 'flex', opacity: 1, x: 0 })
      .fromTo('.options', { opacity: 0, x: -30, ease: Power1.easeOut },
        { opacity: 1, x: 0, stagger: 0.1, ease: Power1.easeIn }, '-=0.5')

    setState(true)
  }

  const HandleClose = () => {
    t1
      .fromTo('.items', 0.5, { dislay: 'flex', opacity: 1, x: 0, ease: Power1.easeOut },
        { display: 'none', opacity: 0, x: -50 })
      .to('.navbar', 1.3, { width: 0, ease: Power1.easeOut })
      .to('main', 1.3, { width: '88vw', ease: Power1.easeOut }, '-=1.3')
      .to('.game-description, .rating', 0.1, { opacity: 1, ease: Power1.easeOut })
    setState(false)
  }

  const HandleCloseFromLink = () => {
    t1
      .fromTo('.items', 0, { display: 'flex', opacity: 1, x: 0, ease: Power1.easeOut },
        { display: 'none', opacity: 0, x: -50 })
      .to('.navbar', 0, { width: 0, ease: Power1.easeOut })
      .to('main', 0, { width: '88vw', ease: Power1.easeOut })
      .to('.game-description, .rating', 0.1, { opacity: 1, ease: Power1.easeOut }, '-=1')
    setState(false)
  }

  const linkStyle = {
    textDecoration: 'none'
  }

  const ToggleModal = () => {
    setModal(!modalOpen)
  }

  const HandleLogout = () => {
    auth.logOut()
    props.history.push('/')
    t1
      .fromTo('.items', 0, { display: 'flex', opacity: 1, x: 0, ease: Power1.easeOut },
        { display: 'none', opacity: 0, x: -50 })
      .to('.navbar', 0, { width: 0, ease: Power1.easeOut })
      .to('main', 0, { width: '88vw', ease: Power1.easeOut })
      .to('.game-description, .rating', 0.1, { opacity: 1, ease: Power1.easeOut }, '-=1')
    setState(false)
  }

  const IconRedirect = (e) => {
    let path
    const name = e.target.name
    name === 'person-outline' ? path = '/user/' + auth.getUserId() : path = '/add'
    props.history.push(path)
  }

  return (
    <>
      <aside className="aside">
        <div onClick={isOpen !== true ? HandleOpen : HandleClose} className="hamburger-container">
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>
        {auth.isLoggedIn() ?
          <div className='icons'>
            <ion-icon onClick={(e) => IconRedirect(e)} name="person-outline"></ion-icon>
            <ion-icon onClick={(e) => IconRedirect(e)} name="add-circle-outline"></ion-icon>
          </div> : null
        }


        <h3> - bringing together ideas and opinions - </h3>
      </aside>

      <div className="navbar">
        <ul className='items'>
          <Link className='options' to='/cook' style={linkStyle} onClick={HandleCloseFromLink}>
            <li> 01. <span> COOK / </span> the recipes </li>
          </Link>

          <Link className='options' to='/game' style={linkStyle} onClick={HandleCloseFromLink}>
            <li> 02. <span> GAME / </span> social in social distancing </li>
          </Link>

          <Link className='options' to='/read' style={linkStyle} onClick={HandleCloseFromLink}>
            <li> 03. <span> READ / </span> be inspired </li>
          </Link>

          <Link className='options' to='/watch' style={linkStyle} onClick={HandleCloseFromLink}>
            <li> 04. <span> WATCH / </span> on screen entertainment </li>
          </Link>

          {!auth.isLoggedIn() ?
            <div className='options' onClick={ToggleModal}>
              <li> 05. <span> LOGIN / </span> register </li>
            </div> :
            <div className='options' onClick={() => HandleLogout()} >
              <li> 05. <span> LOGOUT </span>  </li>
            </div>}


        </ul>
      </div>
      {modalOpen ? <LoginModal
        ToggleModal={ToggleModal}
        props={props}
        HandleCloseFromLink={HandleCloseFromLink} /> : null}
    </>
  )
}

export default withRouter(NavBar)