import React from 'react'
import axios from 'axios'
import auth from '../../../../../backend/lib/auth'
import { withRouter } from 'react-dom'

class EditCookForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    const { id, category } = this.props.match.params
    axios.get(`/api/${category}/${id}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error(err))
  }

  handleSubmit(event) {
    const userId = auth.getUserId()
    const { id, category } = this.props.match.params
    event.preventDefault()
    axios.put(`/api/${category}/${id}`, this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => this.props.history.push(`/user/${userId}`))
      .catch(err => console.error(err))
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  render() {
  const { title, description, serves, prepTime, cookTime, rating, mealtype, dietary, ingredients, method, image } = this.state.data
  if (!this.state) return null
  return (
    <div className="add-form">
      <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
      <input placeholder='Title' name='title' type="text" value={title} />
      <input placeholder='Description' name='description' type="text" value={description} />

      <div className="short-inputs">
        <input placeholder='Serves' name='serves' type="text" value={serves} />
        <input placeholder='Prep Time' name='prepTime' type="text" value={prepTime} />
        <input placeholder='Cook Time' name='cookTime' type="text" value={cookTime}/>
        <input placeholder='Rating' name='rating' type="text" value={rating} />
        <input placeholder='Starter, Main, Dessert' name='mealtype' type="text" value={mealtype} />
        <input placeholder='Dietary' name='dietary' type="text" value={dietary} />
      </div>

      <input placeholder='Ingredients, seperated by commas' name='ingredients' type="text" value={ingredients} />
      <input placeholder='Method, seperated by commas' name='method' type="text" value={method} />
      <input placeholder='Image (Link)' name='image' type="text" value={image} />
      <button>submit</button>
      </form>

    </div>
  )
  }
}

export default EditCookForm
