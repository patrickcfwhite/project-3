import React from 'react'
import axios from 'axios'
// import { SingleEntryPlugin } from 'webpack'



class SingleRecipe extends React.Component {
  constructor() {
    super()
    this.state = {
      recipe: []
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`/api/cook/${id}`)
      .then(response => {
        this.setState({ recipe: response.data })

      })
  }

  render() {
    const { recipe } = this.state
    console.log(recipe.ingredients)
    return (
      <main>
        <div className="single-rec-container">
          <div className="single-rec-left">

            <div className="left-top">
              <h1> {recipe.title} </h1>
              <h5> {recipe.description} </h5>
              <p> Serves: {recipe.serves} <span> Prep: {recipe.prepTime} </span> Cook: {recipe.cookTime} </p>
            </div>
            <div className="rec-media">
              <h4> INGREDIENTS </h4>
              <div className="media-left">

                {recipe.length === 0 ? null : <ul className='to-hide'>
                  {recipe.ingredients.map((el, i) => {
                    return <li key={i}> - {'\u00A0'} {el} </li>
                  })}
                </ul>}


              </div>
              <div className="media-right">
                <img src={recipe.image} />
              </div>
            </div>

          </div>

          <div className="single-rec-right">
            {recipe.length === 0 ? null :
              <ol>
                METHOD:
                {recipe.method.map((el, i) => {
                  return (
                    <li key={i}> {el} </li>
                  )
                })}
              </ol>}
          </div>

        </div>

      </main>
    )
  }
}

export default SingleRecipe