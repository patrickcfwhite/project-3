import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class test extends React.Component {
  constructor() {
    super()
    this.state = {
      response: []
    }
  }

  componentDidMount() {
    Axios.get('/api/play')
      .then(response => {
        this.setState({ response: response.data })
      })
  }

  test(e) {
    this.props.history.currentGame = e.target.id
    this.props.history.push('/game')
  }

  render() {
    return (
      <>
        {this.state.response.map(el => {
          return (
            <div key={el._id}>
              <h1 id={el._id}> {el.title} </h1>
              <ion-icon onClick={(e) => this.onClick(e)} name="document-text-sharp"> </ion-icon>
              <h4> {el.category}</h4>
            </div>
          )
        })}

      </>
    )

  }
}

export default test