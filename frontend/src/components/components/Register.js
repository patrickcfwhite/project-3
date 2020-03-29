import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      register: {
        username: '',
        firstname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        image: ''
      },
      errors: {}
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const register = { ...this.state.register, [name]: value }
    this.setState({ register })

  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/register',
      this.state.register)
      .then(() => this.props.history.push('/'))
      .catch(error => console.log(error))
  }



  render() {
    return <main>
      <div className='register-container'>
        <div className='register-title'>
          <h1>Register An Account</h1>
          <div className='already-registered'>
            <Link to='/login'>Already have an account? Login</Link>
          </div>
        </div>
        <div className='form-container'>
          <form
            encType='multipart/form-data'
            onSubmit={(event) => this.handleSubmit(event)}>
            <div className='field'>
              <input
                onChange={(event) => this.handleChange(event)}
                type="text"
                placeholder="Username"
                name='username'>
              </input>
            </div>
            <div className='field'>
              <input
                onChange={(event) => this.handleChange(event)}
                type="text"
                placeholder="First Name"
                name='firstname'>
              </input>
            </div>
            <div className='field'>
              <input
                onChange={(event) => this.handleChange(event)}
                type="email"
                placeholder='Email Address'
                name='email'>
              </input>
            </div>
            <div className='field'>
              <input
                onChange={(event) => this.handleChange(event)}
                type="password"
                placeholder='Password'
                name='password'>
              </input>
            </div>
            <div className='field'>
              <input
                onChange={(event) => this.handleChange(event)}
                type="password"
                placeholder='Password Confirmation'
                name='passwordConfirmation'></input>
            </div>
            <div className='field'>
              <label className='btn'> Click To Upload Image
                <input type='file'/>
              </label>
            </div>
            <div className='submit'>
              <button>
                Register!</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  }
}



export default Register