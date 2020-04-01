import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoginModal from './Login'
import validator from 'email-validator'

const Register = (props) => {

  const [register, setRegister] = useState({ username: '', firstname: '', email: '', password: '', passwordConfirmation: '', validEmail: true, passwordMatch: true, completeCheck: true })
  const [modalOpen, setModal] = useState(false)


  const ToggleModal = () => {
    setModal(!modalOpen)
  }

  function handleChange(event) {

    const { name, value } = event.target
    const data = { ...register, [name]: value }
    const check = { ...data, validEmail: validateEmail(data.email), passwordMatch: validatePass(data.password, data.passwordConfirmation), completeCheck: true }
    console.log(data, check)
    setRegister({ ...check })
    console.log(register)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (submitCheck()) {
      axios.post('/api/register',
        register)
        .then(() => props.history.push('/'))
        .catch(error => console.log(error))
    } else return
  }

  function HandleCloseFromLink() {
    return
  }

  function validateEmail(email) {
    if (email.length === 0) return true
    return validator.validate(email)
  }

  function validatePass(password, passwordConfirmation) {
    if (password.length === 0 || passwordConfirmation.length === 0) return true
    return ((password.length !== 0 && passwordConfirmation.length !== 0) && password === passwordConfirmation)
  }

  function submitCheck() {
    for (const o in register) {
      if (!register[o]) {
        setRegister({ ...register, completeCheck: false })
        return false
      }
    }
    return true
  }


  console.log(props)
  return <main>
    <div className='register-container'>
      <div className='register-title'>
        <h1>Register An Account</h1>
        

      </div>
      <div className='form-container'>
        <form
          onSubmit={(event) => handleSubmit(event)}>

          <input
            onChange={(event) => handleChange(event)}
            type="text"
            placeholder="Username"
            name='username'>
          </input>


          <input
            onChange={(event) => handleChange(event)}
            type="text"
            placeholder="First Name"
            name='firstname'>
          </input>


          <input
            onChange={(event) => handleChange(event)}
            type="email"
            placeholder='Email Address'
            name='email'>
          </input>
          {!register.validEmail && <small>Email Address is not valid</small>}


          <input
            onChange={(event) => handleChange(event)}
            type="password"
            placeholder='Password'
            name='password'>
          </input>

          <input
            onChange={(event) => handleChange(event)}
            type="password"
            placeholder='Password Confirmation'
            name='passwordConfirmation'></input>
          {!register.passwordMatch && <small>Passwords must match</small>}
          {/* <div className='field'>
              <label className='btn'> Click To Upload Image
                <input type='file'/>
              </label>
            </div> */}
        {!register.completeCheck && <small>Please Complete All Fields</small>}
            <button> Register!</button>


        </form>
        <button className='registered'onClick={ToggleModal}>Already have an account? Login</button>

       
      </div>
    </div>
    {modalOpen ? <LoginModal
      ToggleModal={ToggleModal}
      HandleCloseFromLink={HandleCloseFromLink}
      props={props} /> : null}
  </main>
}



export default Register