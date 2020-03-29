import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

class test extends React.Component {
  constructor() {
    super()
    this.state = {
      response: []
    }
  }

  componentDidMount() {
    Axios.get('/api/play/5e7f45e3397bbd04b3bcc849')
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
        <h1 onClick={(e) => this.test(e)} id={this.state.response._id}> { this.state.response.title } </h1>

    )

  }
}

export default test