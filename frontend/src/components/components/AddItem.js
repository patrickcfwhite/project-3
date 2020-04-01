import React from 'react'
import { TimelineLite } from 'gsap'

import ReadForm from '../components/forms/ReadForm'
import CookForm from '../components/forms/CookForm'
import GameForm from '../components/forms/GameForm'
import WatchForm from '../components/forms/WatchForm'
import axios from 'axios'
import auth from '../../../../backend/lib/auth'

class AddItem extends React.Component {
  constructor() {
    super()
    this.myRef = React.createRef()
    this.state = {
      isSelectActive: false,
      submitObject: {}
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
    this.setState({ submitObject: {} })
    const t1 = new TimelineLite
    t1
      .to('.subcat', 0.1, { display: 'none' })
      .to('.category-select', 0.7, { transform: 'translate(0, -10%)' }, '+=0.5')
      .to('.add-form', 0.1, { display: 'block' })
      .to('.add-form', 0.4, { opacity: 1 })
      .to('form', 0.3, { opacity: 1 })
    this.setState({ isSelectActive: false })
  }

  HandleChange() {
    const { current } = this.myRef
  
    const submitObject = ({ ...this.state.submitObject, [event.target.name]: event.target.value,
      subcategory: current.innerHTML === 'film' ? 'Film' : current.innerHTML === 'tv series' ? 'TV Series' : '',
      category: current.innerHTML === 'film' || current.innerHTML === 'tv series' ? 'watch' : current.innerHTML })
    this.setState({ submitObject })
  }

  HandleItemPost(e) {
    // e.preventDefault()
 
    const category = this.state.submitObject.category
    
    axios.post(`/api/${category}`, this.state.submitObject, 
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })

    console.log(this.state.submitObject)
  }


  render() {
    const { current } = this.myRef

    return (
      <main>
        <div className='add-container'>
          <div className="category-select">
            <h1> Please select your item category </h1>
            <div className='options'>
              <h4 ref={this.myRef} > Choose... </h4>
              <ul>
                <li onClick={(e) => this.HandleOptions(e)} id='cook'> Cook </li>
                <li onClick={(e) => this.HandleOptions(e)} id='play'> Game </li>
                <li onClick={(e) => this.HandleOptions(e)} id='read'> Read </li>

                <li onClick={(e) => this.HandleOpen(e)} className="watch"> Watch 
                  <ion-icon style={{ animation: 'none', fontSize: '16px', transform: 'translate(-4px, -6px)' }} name="add-outline"></ion-icon>
                  <li className='subcat' onClick={(e) => this.HandleOptions(e)} id='film'>Film</li>
                  <li className='subcat' onClick={(e) => this.HandleOptions(e)} id='tv series'> TV Series</li>
                </li>
              </ul>
            </div>

          </div>

          <div className="add-form">
            <form onSubmit={(e) => this.HandleItemPost(e)} onChange={(e) => this.HandleChange(e)} action="">
              {current ? (current.innerHTML === 'film' || current.innerHTML === 'tv series') ?
                <WatchForm current={this.myRef} /> : current.innerHTML === 'cook' ? <CookForm />
                  : current.innerHTML === 'play' ? <GameForm />
                    : current.innerHTML === 'read' ? <ReadForm /> : null : null}
              <button> SUBMIT </button>
            </form>


          </div>
        </div>
      </main>

    )
  }
}

export default AddItem