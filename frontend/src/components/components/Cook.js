import React from 'react'
// import Panzoom from 'panzoom'
import axios from 'axios'
import { TimelineLite, Power4 } from 'gsap'

class Cook extends React.Component {

  constructor() {
    super()
    // this.myRef = React.createRef()
    this.state = {
      recipes: [],
      isRecipeActive: false,
      singleRecipe: []
    }
  }

  componentDidMount() {

    axios.get('/api/cook')
      .then(response => {
        this.setState({ recipes: response.data })
        console.log(response.data)
      })
  }

  HandleExpansion(e) {

    let query = ''
    const others = []
    let id = ''

    if (e.target.tagName === 'BUTTON') {
      id = e.target.parentNode
    } else if (e.target.tagName === 'H1') {
      id = e.target.parentNode
    } else if (e.target.className === 'recipe-info') {
      id = e.target.parentNode
    } else if (e.target.tagName === 'DIV') {
      id = e.target
    }

    console.log(id.key)

    this.state.recipes.map(other => {
      if (other.title.replace(/\W/g, '') !== id.className) {
        others.push('.' + other.title.replace(/\W/g, ''))
      } else {
        query = other._id
      }
    })

    // get the single item clicked
    axios.get(`/api/cook/${query}`)
      .then(response => {
        this.setState({ singleRecipe: response.data })
      })

    const t1 = new TimelineLite
    t1
      .to('.recipe-items', 0.5, { opacity: 0 })
      .to(others, 0.2, { opacity: 0 }, '-=0.3')
      .to(id, 0.2, { opacity: 0 }, '-=0.3')
      .to(others, 0.4, { display: 'none' }, '+=0.1')
      .to('.recipe-container', 0.1, { paddingTop: 0 })
      .to(id, 0.4, { opacity: 1 }, '+=0.1')
      .to(id, 0.2, { height: '83.3vh' }, '+=0.3')
      .to(id, 0.4, { width: '95%' }, '+=0.3')
    // .to('.single', 0.1, { display: 'flex' }, '-=0')


    setTimeout(() => {
      this.setState({ isRecipeActive: true })
    }, 2600)

  }

  HandleCollapse(e) {
    const others = []
    let id = ''

    if (e.target.tagName === 'BUTTON') {
      id = e.target.parentNode
    } else if (e.target.tagName === 'H1') {
      id = e.target.parentNode.parentNode
    } else if (e.target.tagName === 'DIV') {
      id = e.target
    }

    this.state.recipes.map(other => {
      if (other.title.replace(/\W/g, '') !== id.className) {
        others.push('.' + other.title.replace(/\W/g, ''))
      }
    })


    const t1 = new TimelineLite
    t1
      .to('.recipe-items', 0.1, { opacity: 0 })
      .to(id, 0.4, { width: '20vw' }, '+=0.5')
      .to(id, 0.2, { height: '24vh' }, '+=0.3')
      .to(id, 0.3, { opacity: 0 }, '+=0.1')
      .to('.recipe-container', 0.1, { paddingTop: '70vh' })
      .to(others, 0.4, { display: 'flex' }, '+=0.1')
      .to(id, 0.2, { opacity: 0.7 }, '-=0.3')
      .to(others, 0.2, { opacity: 0.7 }, '-=0.3')
      .to('.recipe-items', 0.5, { opacity: 1 })

    setTimeout(() => {
      this.setState({ isRecipeActive: false })
    }, 2500)

  }



  render() {

    const { singleRecipe } = this.state

    return (

      <main >
        <div className="recipe-container">
          <div className="recipe-row">
            {this.state.recipes.map(dish => {
              return (
                <div onClick={(e) => !this.state.isRecipeActive ? this.HandleExpansion(e) : this.HandleCollapse(e)}
                  className={dish.title.replace(/\W/g, '')} key={dish._id} id="recipe-card">
                  <h1 className='recipe-items'> {dish.title} </h1>
                  <h5> Serves: {dish.serves} </h5>

                  <ul>
                    {dish.dietary.map((diet, i) => {
                      return <li key={i}> {diet !== 'none' ? diet : null} </li>
                    })}
                  </ul>

                </div>
              )
            })}

            {/* single recipe */}
            <div className="single">

              <div className="single-left">
                <h1> {singleRecipe.title} </h1>
                <h6> {singleRecipe.description} </h6>
                <p> Prep Time: {singleRecipe.prepTime}, Cook Time: {singleRecipe.cookTime} </p>

                {singleRecipe.length === 0 ? null : <ul>
                  {singleRecipe.ingredients.map((el, i) => {
                    return <li key={i}> {el} </li>
                  })}
                </ul>}

              </div>

              <div className="single-middle">
                {singleRecipe.length === 0 ? null :
                  <ol>
                    {singleRecipe.method.map((el, i) => {
                      return <li key={i}> {el} </li>
                    })}
                  </ol>}
              </div>

            </div>

          </div>
        </div>

      </main >

    )
  }
}

export default Cook