import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import auth from '../../../../backend/lib/auth'
import '../../styles/profile.scss'

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
    // console.log(cat, subcat)
    if (cat === 'Watch') {
      icon = subcat === 'Film' ? <ion-icon style={{ animation: 'none' }} name="film-sharp"></ion-icon> : <ion-icon style={{ animation: 'none' }} name="tv-sharp"></ion-icon>
    } else if (cat === 'Cook') {
      icon = <ion-icon style={{ animation: 'none' }} name="fast-food-sharp"></ion-icon>
    } else if (cat === 'Read') {
      icon = <ion-icon style={{ animation: 'none' }} name="book-sharp"></ion-icon>
    } else if (cat === 'Play') {
      icon = <ion-icon style={{ animation: 'none' }} name="game-controller-sharp"></ion-icon>
    }
    // console.log(icon)
    return icon
  }

  isProfile() {
    return auth.getUserId() === this.state.user._id
  }



  getData() {
    const id = this.props.match.params.id
    console.log(id)
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

  componentDidMount() {
    this.getData()
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.)
  // }

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
        // console.log(res.data)
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
        // console.log(res.data)
        window.location.reload()
      })
      .catch(error => console.log(error))
  }

  HandleRedirect(e) {
    const { history } = this.props
    const category = e.target.parentNode.id
    const { id } = e.target

    if (category === 'Watch' || category === 'Cook') {
      history.push(`/${category}/${e.target.id}`)
    } else if (category === 'Play') {
      history.currentGame = id
      history.push('/play')
    } else if (category === 'Read') {
      history.currentBook = id
      history.push('/read')
    }
  }

  handleDeleteItem(e) {
    e.preventDefault()
    const token = auth.getToken()
    const id = auth.getUserId()
    const userId = this.props.match.url
    const category = e.target.id
    const itemId = e.target.parentNode.parentNode.firstChild.id

    axios.delete(`/api${userId}/uploads/${category}/${itemId}`, { headers: { authorization: `Bearer ${token}` } })
      .then(res => {
        location.reload()
      })
      .catch(error => console.log(error))
  }


  render() {

    const { username, firstname, createdAt } = this.state.user
    const { follow, followedBy, following, savedItems, uploads } = this.state
    const isProfile = this.isProfile()
    const joined = new Date(createdAt)
    if (!this.state) return <h1>Loading!</h1>
    return (

      <main>

        <div className="Profile">

          <div className="profile-header">
            {isProfile ? <h1>Welcome back {firstname}! </h1> : <h1>{username} </h1>}
            <small>Joined {moment(joined).fromNow()}</small>
            <div className="follow-button">
              {!isProfile && !follow && <button onClick={() => this.followUser()}>Follow</button>}
              {!isProfile && follow && <button onClick={() => this.unfollowUser()}>Unfollow</button>}
            </div>
          </div>


          <div className='user-information'>

            <div className="following-container">
              <div className="buffer"></div>
              <h2>Following:{'\u00A0'} <span>{following.length}</span> </h2>
              <div className="profile-row-container">
                {this.state.following.map(follow => {
                  return (
                    <div className='profile-rows' key={follow._id}>
                      <a href={`/user/${follow._id}`}>
                        <img src={follow.image} />
                        <div className="following-users">
                          <h3>Username: {'\u00A0'} {follow.username}</h3>
                        </div>
                      </a>

                    </div>
                  )
                })}
              </div>

            </div>

            <div className="followers-container">
              <div className="buffer"></div>
              <h2>Followers: {'\u00A0'} <span>{followedBy.length}</span></h2>
              <div className="profile-row-container">
                {this.state.followedBy.map(follow => {
                  return (
                    <div className='profile-rows' key={follow._id}>
                      <a href={`/user/${follow._id}`}>
                        <img src={follow.image} />
                        <div className="following-users">
                          <h3>Username:{'\u00A0'}  {follow.username}</h3>
                        </div>
                      </a>

                    </div>
                  )
                })}
              </div>
            </div>

            <div className="uploads-container">
              <div className="buffer"></div>
              <h2>Uploads:{'\u00A0'} <span>{uploads.length}</span></h2>
              <div className="profile-row-container">
                {this.state.uploads.map(upload => {
                  const userId = auth.getUserId()
                  return (
                    <div className='profile-rows'  key={upload._id}>
                      <div className='item-icon'>
                        {this.iconChoice(upload.category, upload.subcategory)}
                      </div>
                      <div id={upload.category}className='item-displayed'>
                        <p id={upload._id} onClick={(e) => this.HandleRedirect(e)} >{upload.title}</p>
                        <div className="upload-buttons">
                          {isProfile && <Link to={`/user/${userId}/uploads/${upload.category}/${upload._id}`}> Edit</Link>}
                          {isProfile && <button id={upload.category} onClick={(e) => this.handleDeleteItem(e)} >Delete</button>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="saved-container">

              <div className="buffer"></div>
              <h2>Saved Items:{'\u00A0'} <span> {savedItems.length} </span></h2>
              <div className="profile-row-container">
                {this.state.savedItems.map(saved => {
                  return (
                    <div className='profile-rows'  key={saved._id}>
                      {/* <img src={upload.image} /> */}
                      <div className='item-icon'>
                        {this.iconChoice(saved.category, saved.subcategory)}
                      </div>
                      {/* <a href={`/${saved.category}/${saved._id}`}> */}
                      <div id={saved.category} className='item-displayed'>
                        <p id={saved._id} onClick={(e) => this.HandleRedirect(e)}>{saved.title}</p>
                        {/* </a> */}
                      </div>
                      {/* <h3>{saved.category}</h3> */}
                     
                    </div>


                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile