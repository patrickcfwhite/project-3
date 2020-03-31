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
      followedBy: [],
      follow: false
    }
  }

  populateArray(arr, name) {
    for (const i of arr) {
      const path = name === 'following' || name === 'followedBy' ? 'user' : i[1]
      axios.get(`/api/${path}/${i[0]}`)
        .then(resp => {
          // console.log(resp.data)
          const data = this.state[name].push(resp.data)
          this.setState({ name: data })
        })
    }
  }

  iconChoice(cat, subcat) {
    let icon
    console.log(cat, subcat)
    if (cat === 'Watch') {
      icon = subcat === 'Film' ? <ion-icon name="film-sharp"></ion-icon> : <ion-icon name="tv-sharp"></ion-icon>
    } else if (cat === 'Cook') {
      icon = <ion-icon name="fast-food-sharp"></ion-icon>
    } else if (cat === 'Read') {
      icon = <ion-icon name="book-sharp"></ion-icon>
    } else if (cat === 'Play') {
      icon = <ion-icon name="game-controller-sharp"></ion-icon>
    }
    console.log(icon)
    return icon
  }

  isProfile() {
    return auth.getUserId() === this.state.user._id
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
        this.toggleFollow()
       
      })
  }

  toggleFollow() {
    const userId = auth.getUserId()
    this.state.user.followedBy.some(x => x.toString() === userId.toString()) ? this.setState({ follow: true }) : this.setState({ follow: false })
  }

  followUser() {
    if (this.isProfile()) return
    const token = auth.getToken()
    const path = (this.props.location.pathname)

    axios.post(`/api/${path}`, {}, { headers: { authorization: `Bearer ${token}` } })
      .then(res => {
        console.log(res.data)
        window.location.reload()
      })
      .catch(error => console.log(error))
  }

  unfollowUser() {
    if (this.isProfile()) return
    const token = auth.getToken()
    const path = this.props.location.pathname
    const user = auth.getUserId()

    axios.delete(`/api/user/${user}/following${path}`, { headers: { authorization: `Bearer ${token}` } })
      .then(res => {
        console.log(res.data)
        window.location.reload()
      })
      .catch(error => console.log(error))
  }

  render() {
    console.log(this.state.user)
    // console.log(this.props)
    console.log(this.state.follow)
    const { username, firstname, createdAt } = this.state.user
    const { follow, followedBy, following, savedItems, uploads } = this.state
    const isProfile = this.isProfile()
    const joined = new Date(createdAt)
    if (!this.state) return <h1>Loading!</h1>
    return (

      <div className="Profile">
        {isProfile && <p>Welcome back {firstname}!</p>}
        <h1>My Profile</h1>
        <h2></h2>
        <p>joined {moment(joined).fromNow()}</p>
        <h2>{username}</h2>
        <h2>Uploads: {uploads.length}</h2>
        
        {this.state.uploads.map(upload => {
          const userId = auth.getUserId()
          return (
            <div key={upload._id}>
              {/* <img src={upload.image} /> */}
              <a href={`/${upload.category.toLowerCase()}/${upload._id}`}>
                <h3>{upload.title}</h3>
              </a>
              {/* <h3>{upload.category}</h3> */}
              {this.iconChoice(upload.category, upload.subcategory)}
              {isProfile && <Link to={`/user/${userId}/uploads/${upload.category}/${upload._id}`}>Edit</Link>}
            </div>
          )
        })}
        <h2>Saved Items: {savedItems.length}</h2>
        {this.state.savedItems.map(saved => {
          return (
  
            <div key={saved._id}>
              {/* <img src={upload.image} /> */}
              <a href={`/${saved.category}/${saved._id}`}>
                <h3>{saved.title}</h3>
              </a>
              {/* <h3>{saved.category}</h3> */}
              {this.iconChoice(saved.category, saved.subcategory)}
              
            </div>
          )
        })}
        <h2>Following: {following.length}</h2>
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
        <h2>Followers: {followedBy.length}</h2>

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
        {!isProfile && !follow && <button onClick={() => this.followUser()}>Follow here</button>}
        {!isProfile && follow && <button onClick={() => this.unfollowUser()}>Unfollow here</button>}
      </div>
    )
  }
}

export default Profile