import React from 'react'
import Panzoom from 'panzoom'
import axios from 'axios'

class Cook extends React.Component {

  constructor() {
    super()
    this.myRef = React.createRef()
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    Panzoom(this.myRef.current, {
      minZoom: 1,
      maxZoom: 1
    })

    axios.get('/api/cook')
      .then(response => {
        this.setState({ recipes: response.data })
      })
  }


  render() {

    return (

      <main>
        <div ref={this.myRef} className="recipe-container">

          <div className="recipe-row">

            {this.state.recipes.map(dish => {
              return (
                <div key={dish._id} className="recipe-card">
                  <h1> {dish.name} </h1>
                  <p> {dish.description} </p>
                </div>
              )

            })}

          </div>




        </div>

      </main >

    )
  }
}

export default Cook