import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LoginModal = ({ ToggleModal, props, HandleCloseFromLink }) => {

  const [login, setLogin] = useState({ email: '', password: '' })

  function handleChange(event) {
    const { name, value } = event.target
    const login = { ...login, [name]: value }
    setLogin({ login })
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login',
      login)
      .then(() => props.history.push('/'))
      .catch(error => console.log(error))
  }

  function CloseNavBarandModal() {
    ToggleModal()
    HandleCloseFromLink()
  }


  console.log(ToggleModal)
  return <div className='modal is-active'>
    <div className='modal-background' onClick={ToggleModal}></div>
    <div className="modal-content">
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
}




export default LoginModal