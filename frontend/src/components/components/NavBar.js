import React, { useState, useRef, useEffect } from 'react'
import { TweenMax, TimelineLite, Power1 } from 'gsap'

const NavBar = () => {
  // useState hook, array takes 2 args [stateName, setState]
  const [isOpen, setState] = useState(false)

  // from defines starting position to what we currently have rendered on the page, as its final position
  // throw { paused: true } stops animation from happening on page refresh
  const t1 = new TimelineLite()

  const HandleOpen = () => {
    t1
    // (selector, duration, {css properties}, animationDelay) 
      .to('main', 2, { width: '52vw', ease: Power1.easeOut })
      .to('.navbar', 2, { width: '36vw', ease: Power1.easeOut }, '-=2')
      .fromTo('.items', 1.5, { display: 'none', opacity: 0, x: -50, ease: Power1.easeOut },
        { display: 'flex', opacity: 1, x: 0 })
    setState(true)
  }

  const HandleClose = () => {
    t1
      .fromTo('.items', 0.5, { disaply: 'flex', opcacity: 1, x: 0, ease: Power1.easeOut },
        { display: 'none', opacity: 0, x: -50 })
      .to('.navbar', 1.3, { width: 0, ease: Power1.easeOut })
      .to('main', 1.3, { width: '88vw', ease: Power1.easeOut }, '-=1.3')
    setState(false)
  }

  return (
    <>
      <aside className="aside">
        <div onClick={isOpen !== true ? HandleOpen : HandleClose} className="hamburger-container">
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>

        <h3> - bringing together ideas and opinions - </h3>
      </aside>

      <div  className="navbar">
        <ul className='items'>
          <li> 01. <span> COOK / </span> the recipes </li>
          <li> 02. <span> GAMES / </span> social in social distancing </li>
          <li> 03. <span> READ / </span> be inspired </li>
          <li> 04. <span> WATCH / </span>on screen entertainment </li>
          <li> 05. <span> LOGIN / </span> access more </li>
        </ul>
      </div>
    </>
  )
}

export default NavBar