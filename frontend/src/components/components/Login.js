import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import auth from '../../../../backend/lib/auth'

const LoginModal = ({ ToggleModal, CloseNavBarandModal, props }) => {


  const [login, setLogin] = useState({ email: '', password: '' })

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...login, [name]: value }
    setLogin({ ...data })
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login', login)
      .then(res => {
        const token = res.data.token
        auth.setToken(token)
        CloseNavBarandModal()
        props.history.push(`/user/${auth.getUserId()}`)
      })
      .catch(error => console.log(error))
  }



  return <div className='modal is-active'>
    <div className='modal-background' onClick={ToggleModal}></div>
    <div className="modal-content">
      <div className="register-container">
        <h1>Login!</h1>
        <Link to='/register' onClick={CloseNavBarandModal}>Create a New Account</Link>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="email"
            placeholder='Email Address'
            name='email'>
          </input>
          <input
            onChange={handleChange}
            type="password"
            placeholder='Password'
            name='password'>
          </input>
          <div className='submit'>
            <button>
              Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
}




export default withRouter(LoginModal)