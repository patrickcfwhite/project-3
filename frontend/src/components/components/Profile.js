import React from 'react'
import axios from 'axios'
import moment from 'moment'
import auth from '../../../../backend/lib/auth'

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {},
      uploads: [],
      savedItems: [],
      following: [],
      followedBy: []
    }
  }

  populateArray(arr, name) {
    console.log(arr, name)
    for (const i of arr) {
      axios.get(`/api/user/${i}`)
        .then(resp => {
          console.log('data equals oh yeah!!!', resp.data)
          const egg = this.state[name].push(resp.data)
          console.log(egg)
          this.setState({ name: egg })
        })
    }
  }

  componentDidMount() {
    
    const id = this.props.match.params.id
    console.log(this.props)
    axios.get(`/api/user/${id}`)
      .then(resp => this.setState({ user: resp.data }))
      .then(() => {
        const { uploads, savedItems, following, followedBy } = this.state.user
        this.populateArray(uploads, 'uploads')
        this.populateArray(savedItems, 'savedItems')
        this.populateArray(following, 'following')
        this.populateArray(followedBy, 'followedBy')
      })
  }

  render() {
    const { username, firstname, createdAt } = this.state.user
    console.log(createdAt)
    let joined = new Date(createdAt)
    console.log(joined)
    // console.log(this.state)
    if (!this.state) return <h1>Loading!</h1>
    return (

      <div className="Profile">
        <p>Welcome back {firstname}!</p>
        <h1>My Profile</h1>
        <h2></h2>
    <p>joined {moment(joined).fromNow()}</p>
        <h2>{this.state.user.firstname}</h2>
        <h2>Following:</h2>
        {this.state.following.map(follow=> {
          return (
            <div key={follow._id}>
              <h3>Username: {follow.username}</h3>
              <h3>Name: {follow.firstname}</h3>
            </div>
          )
        })}
        <h2>Uploads:</h2>
        {this.state.uploads.map(upload=> {
          return (
            <div key={upload._id}>
              <h3>{upload.title}</h3>
              <h3>{upload.category}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Profile