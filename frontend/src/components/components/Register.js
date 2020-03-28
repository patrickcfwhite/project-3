import React from 'react'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  render() {
    return <div className='main-container'>
      <h1>Register for an account!</h1>
      <Link to='/'>Already have an account? Login here</Link>
    </div>
  }
}



export default Register