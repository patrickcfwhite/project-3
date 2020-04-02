import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class ResetPassword extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      updated: false,
      error: false,
      passwordMatch: true,
      expired: false,
      used: false
    }
  }

  componentDidMount() {
    console.log(this.props)
    axios
      .get('/api/reset', {
        params: {
          resetPasswordToken: this.props.match.params.resetPasswordToken
        }
      })
      .then(res => {
        console.log(res)
        if (res.data.message === 'password reset link verified') {
          this.setState({
            username: res.data.username,
            updated: false,
            error: false,
            expired: false,
            used: false

          })
        } else if (res.data.message === 'link has expired.') {
          this.setState({
            updated: false,
            error: false,
            expired: true,
            used: false
          })
        } else if (res.data.message === 'link already used.') {
          this.setState({
            updated: false,
            error: false,
            used: true
          })
        }
      })
      .catch(error => console.log(error))
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state, [name]: value }
    const check = { ...data, passwordMatch: this.validatePass(data.password, data.passwordConfirmation), completeCheck: true }
    console.log(data, check)
    this.setState({ ...check })
  }

  validatePass(password, passwordConfirmation) {
    if (password.length === 0 || passwordConfirmation.length === 0) return true
    return ((password.length !== 0 && passwordConfirmation.length !== 0) && password === passwordConfirmation)
  }

  updatePassword(event) {
    const { username, password } = this.state
    event.preventDefault()
    axios
      .put('/api/updatePassword', {
        username,
        password
      })
      .then(res => {
        console.log(res.data)
        if (res.data.message === 'password updated') {
          this.setState({
            updated: true,
            error: false
          })
        } else if (res.data.message === 'link already used.') {
          this.setState({
            updated: false,
            error: true
          })
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    if (!this.state) return null
    const { error, updated, passwordMatch, expired, used } = this.state
    console.log(this.state)
    return (
      <main>
        <div className='register-container'>
          <div className='register-title'>
            <h1>Reset Your Password Below</h1>
            {expired && !error && !used &&
              <>

                <div className='already-registered'>
                  <div>The reset link has expired.</div><div> Please request another link below.</div>
                  <Link to={'/forgotPassword'}>Try again</Link>
                </div>
              </>
            }
            {used &&
              <>

                <div className='already-registered'>
                  <div>This link has been used and is no longer valid.</div><div> Please request another link below.</div>
                  <Link to={'/forgotPassword'}>Try again</Link>
                </div>
              </>
            }
            {error &&
              <>

                <div className='already-registered'>
                  <div>Updating has not been possible at this time.</div><div> Please request another link below or try again later.</div>
                  <Link to={'/forgotPassword'}>Try again</Link>
                </div>
              </>
            }
            {!error && !expired && !used &&
              <>
                <div className='form-container'>
                  <form
                    onSubmit={(event) => this.updatePassword(event)}>
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
                      {!passwordMatch && <small>Passwords must match</small>}
                    </div>
                    <div className='submit'>
                      <button>Update Password</button>
                    </div>
                  </form>
                </div>
              </>
            }
            {updated &&
              <>
                <div>
                  <p>Your password has been successfully reset! Please try logging in again.</p>
                </div>
                <Link to={'/'}>Head to Homepage</Link>
              </>
            }
          </div>
        </div>
      </main>
    )
  }
}
