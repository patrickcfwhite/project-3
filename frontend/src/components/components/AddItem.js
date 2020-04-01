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

  // TitleCase(input) {
  //   return input[0].toUpperCase() + input.slice(1)
  // }

  HandleChange() {
    const { current } = this.myRef
    console.log('current: ', current.innerHTML)
    const categoryObject = ({ ...this.state.submitObject, subcategory: current.innerHTML === 'Film' || current.innerHTML === 'TV Series' ? current.innerHTML : this.state.subcategory, [event.target.name]: event.target.value })
    const submitObject = ({ ...categoryObject, category: current.innerHTML === 'Film' || current.innerHTML === 'TV Series' ? 'Watch' : current.innerHTML })  
    this.setState({ submitObject })
    console.log('category: ', this.state.submitObject.category, 'subcategory: ', this.state.submitObject.subcategory)
  }

  HandleItemPost(e) {
    e.preventDefault()
    let submitObject = {}
    const category = this.state.submitObject.category
    if (this.state.submitObject.method) {
      submitObject = ({ ...this.state.submitObject, 
        method: this.state.submitObject.method.split(','),
        ingredients: this.state.submitObject.ingredients.split(',')
      })
    } else {
      submitObject = ({ ...submitObject, ...this.state.submitObject })
    }
    axios.post(`/api/${category}`, submitObject, 
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })

    console.log(submitObject)
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
                <li onClick={(e) => this.HandleOptions(e)} id='Cook'> Cook </li>
                <li onClick={(e) => this.HandleOptions(e)} id='Play'> Game </li>
                <li onClick={(e) => this.HandleOptions(e)} id='Read'> Read </li>

                <li onClick={(e) => this.HandleOpen(e)} className="watch"> Watch 
                  <ion-icon style={{ animation: 'none', fontSize: '16px', transform: 'translate(-4px, -6px)' }} name="add-outline"></ion-icon>
                  <li className='subcat' onClick={(e) => this.HandleOptions(e)} id='Film'>Film</li>
                  <li className='subcat' onClick={(e) => this.HandleOptions(e)} id='TV Series'> TV Series</li>
                </li>
              </ul>
            </div>

          </div>

          <div className="add-form">
            <form onSubmit={(e) => this.HandleItemPost(e)} onChange={(e) => this.HandleChange(e)} action="">
              {current ? (current.innerHTML === 'Film' || current.innerHTML === 'TV Series') ?
                <WatchForm current={this.myRef} /> : current.innerHTML === 'Cook' ? <CookForm />
                  : current.innerHTML === 'Play' ? <GameForm />
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