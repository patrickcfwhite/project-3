import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoginModal from './Login'

const Register = ( props ) => {

  const [register, setRegister] = useState({ username: '', firstname: '', email: '', password: '', passwordConfirmation: '' })
  const [modalOpen, setModal] = useState(false)


  const ToggleModal = () => {
    setModal(!modalOpen)
  }

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...register, [name]: value }
    setRegister({ ...data })
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/register',
      register)
      .then(() => props.history.push('/'))
      .catch(error => console.log(error))
  }

  function HandleCloseFromLink() {
    return 
  }


  console.log(props)
  return <main>
    <div className='register-container'>
      <div className='register-title'>
        <h1>Register An Account</h1>
        <div className='already-registered'>
          <div onClick={ToggleModal}>Already have an account? Login</div>
        </div>
      </div>
      <div className='form-container'>
        <form
          onSubmit={(event) => handleSubmit(event)}>
          <div className='field'>
            <input
              onChange={(event) => handleChange(event)}
              type="text"
              placeholder="Username"
              name='username'>
            </input>
          </div>
          <div className='field'>
            <input
              onChange={(event) => handleChange(event)}
              type="text"
              placeholder="First Name"
              name='firstname'>
            </input>
          </div>
          <div className='field'>
            <input
              onChange={(event) => handleChange(event)}
              type="email"
              placeholder='Email Address'
              name='email'>
            </input>
          </div>
          <div className='field'>
            <input
              onChange={(event) => handleChange(event)}
              type="password"
              placeholder='Password'
              name='password'>
            </input>
          </div>
          <div className='field'>
            <input
              onChange={(event) => handleChange(event)}
              type="password"
              placeholder='Password Confirmation'
              name='passwordConfirmation'></input>
          </div>
          {/* <div className='field'>
              <label className='btn'> Click To Upload Image
                <input type='file'/>
              </label>
            </div> */}
          <div className='submit'>
            <button>
              Register!</button>
          </div>
        </form>
      </div>
    </div>
    {modalOpen ? <LoginModal 
      ToggleModal = {ToggleModal}
      HandleCloseFromLink = {HandleCloseFromLink}
      props = {props} /> : null}
  </main>
}



export default Register