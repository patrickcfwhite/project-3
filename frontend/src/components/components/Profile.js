import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
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
    for (const i of arr) {
     const path = name === 'following' || name === 'followedBy' ? 'user' : i[1]
      axios.get(`/api/${path}/${i[0]}`)
        .then(resp => {
          console.log(resp.data)
          const data = this.state[name].push(resp.data)
          this.setState({ name: data })
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
    const joined = new Date(createdAt)
    if (!this.state) return <h1>Loading!</h1>
    return (

      <div className="Profile">
        <p>Welcome back {firstname}!</p>
        <h1>My Profile</h1>
        <h2></h2>
        <p>joined {moment(joined).fromNow()}</p>
        <h2>{username}</h2>
        <h2>Uploads:</h2>
        {this.state.uploads.map(upload => {
          return (
            <div key={upload._id}>
              <img src={upload.image} />
              <h3>{upload.title}</h3>
              <h3>{upload.category}</h3>
            </div>
          )
        })}
        <h2>Saved Items:</h2>
        {this.state.savedItems.map(saved => {
          return (
            <div key={saved._id}>
              <img src={saved.image} />
              <h3>{saved.title}</h3>
              <h3>{saved.category}</h3>
            </div>
          )
        })}
        <h2>Following:</h2>
        {this.state.following.map(follow => {
          return (
            <div key={follow._id}>
              <a href={`/user/${follow._id}`}>
                <img src={follow.image} />
                <h3>Username: {follow.username}</h3>
                <h3>Name: {follow.firstname}</h3>
              </a>

            </div>
          )
        })}
        <h2>Followers:</h2>
        {this.state.followedBy.map(follow => {
          return (
            <div key={follow._id}>
              <a href={`/user/${follow._id}`}>
                <img src={follow.image} />
                <h3>Username: {follow.username}</h3>
                <h3>Name: {follow.firstname}</h3>
              </a>

            </div>
          )
        })}
      </div>
    )
  }
}

export default Profile