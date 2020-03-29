import React from 'react'
import { TimelineLite } from 'gsap'

import ReadForm from '../components/forms/ReadForm'
import CookForm from '../components/forms/CookForm'
import GameForm from '../components/forms/GameForm'
import WatchForm from '../components/forms/WatchForm'

class AddItem extends React.Component {
  constructor() {
    super()
    this.myRef = React.createRef()
    this.state = {
      isSelectActive: false,
      submitObject: {
        name: ''
      }
    }
  }

  HandleOpen() {
    const t1 = new TimelineLite
    const { isSelectActive } = this.state

    if (!isSelectActive) {
      t1
        .to('.subcat', 0.1, { display: 'block' })
        .to('.subcat', 0.4, { opacity: 1 })
      this.setState({ isSelectActive: true })
    } else {
      t1
        .to('.subcat', 0.4, { opacity: 0 })
        .to('.subcat', 0.1, { display: 'none' })
      this.setState({ isSelectActive: false })
    }
  }

  HandleOptions(e) {
    const value = e.target.id
    this.myRef.current.innerHTML = value

    const t1 = new TimelineLite
    t1
      .to('.subcat', 0.1, { display: 'none' })
      .to('.category-select', 0.7, { transform: 'translate(0, 0)' }, '+=0.5')
      .to('.add-form', 0.1, { display: 'block' })
      .to('.add-form', 0.4, { opacity: 1 })
      .to('form', 0.3, { opacity: 1 })
    this.setState({ isSelectActive: false })
  }

  HandleChange() {
    const submitObject = ({ ...this.state.submitObject, [event.target.name]: event.target.value })
    this.setState({ submitObject })
  }


  render() {
    const { current } = this.myRef

    console.log(current)

    return (
      <main>
        <div className='add-container'>
          <div className="category-select">
            <h1> Please select your item category </h1>
            <div className='options'>
              <h4 ref={this.myRef} > Choose... </h4>
              <ul>
                <li onClick={(e) => this.HandleOptions(e)} id='Cook'> Cook </li>
                <li onClick={(e) => this.HandleOptions(e)} id='Game'> Game </li>
                <li onClick={(e) => this.HandleOptions(e)} id='Read'> Read </li>

                <li onClick={(e) => this.HandleOpen(e)} className="watch"> Watch
                  <li className='subcat' onClick={(e) => this.HandleOptions(e)} id='Film'>Film</li>
                  <li className='subcat' onClick={(e) => this.HandleOptions(e)} id='TV Series'> TV Series</li>
                </li>
              </ul>
            </div>

          </div>

          <div className="add-form">
            <form onChange={(e) => this.HandleChange(e)} action="">
              {current ? (current.innerHTML === 'Film' || current.innerHTML === 'TV Series') ?
                <WatchForm current={this.myRef} /> : current.innerHTML === 'Cook' ? <CookForm />
                  : current.innerHTML === 'Game' ? <GameForm />
                    : current.innerHTML === 'Read' ? <ReadForm /> : null : null}
              <button> SUBMIT </button>
            </form>


          </div>
        </div>
      </main>

    )
  }
}

export default AddItem