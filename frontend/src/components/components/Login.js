import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import auth from '../../../../backend/lib/auth'

// being pased down from navbar

const LoginModal = ({ ToggleModal, HandleCloseFromLink, props }) => {


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

  function CloseNavBarandModal() {
    ToggleModal()
    HandleCloseFromLink()
  }



  return <div className='modal is-active'>
    <div className='modal-background' onClick={ToggleModal}></div>

    <div className="modal-content">

      <h1>LOG INTO YOUR ACCOUNT</h1>
    
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
          <button> LOGIN </button>
        </div>
      </form>
      <Link to='/register' onClick={CloseNavBarandModal}> <p> Register For An Account </p></Link>
      <Link to='/forgotPassword' onClick={CloseNavBarandModal}> <p>Forgotten Your Password? </p></Link>
    </div>


  </div>
}




export default withRouter(LoginModal)