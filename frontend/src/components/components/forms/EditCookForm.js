import React from 'react'
import axios from 'axios'
import auth from '../../../../../backend/lib/auth'
import { withRouter } from 'react-dom'
import '../../../styles/editform.scss'

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

  formChooser(cat, subcat) {
    let form
    console.log(cat, subcat)
    if (cat === 'Watch') {
      if (subcat === 'Film') {
        const { title, description, director, duration, rating, certification, image, subcategory } = this.state.data
        form = <>
          <input placeholder='Name' name='title' type="text" value={title} />
          <textarea placeholder='Description' name='description' type="text" value={description} />
          <input placeholder='Director' name='director' type="text" value={director} />
          <div className="short-inputs">
            <input placeholder='Duration' name='duration' type="text" value={duration} />
            <input value={subcategory} readOnly name='subcategory' type="text" />
            <input name='rating' type="text" value={rating} />
            <input placeholder='Certficatation' name='certficatation' type="text" value={certification} />
          </div>
          <input placeholder='Poster Link' name='poster' type="text" value={image} />
        
        </>
      } else {
        const { title, description, director, seasons, rating, certification, image, subcategory } = this.state.data
        form = <>
          <input placeholder='Name' name='name' type="text" value={title} />
          <textarea placeholder='Description' name='description' type="text" value={description} />
          <input placeholder='Director' name='director' type="text" />
          <div className="short-inputs">
            <input placeholder='Seasons' name='Seasons' type="text" value={seasons} />
            <input value={subcategory} readOnly name='subcategory' type="text" />
            <input name='rating' type="text" value={rating} />
            <input placeholder='Certficatation' name='certficatation' type="text" value={certification} />
          </div>
          <input placeholder='Poster Link' name='poster' type="text" value={image} />
        </>
      }
    } else if (cat === 'Cook') {
      const { title, description, serves, prepTime, cookTime, rating, mealtype, dietary, ingredients, method, image } = this.state.data
      form = <>
        <input placeholder='Title' name='title' type="text" value={title} />
        <textarea placeholder='Description' name='description' type="text" value={description} />

        <div className="short-inputs">
          <input placeholder='Serves' name='serves' type="text" value={serves} />
          <input placeholder='Prep Time' name='prepTime' type="text" value={prepTime} />
          <input placeholder='Cook Time' name='cookTime' type="text" value={cookTime} />
          <input name='rating' type="text" value={rating} />
          <input placeholder='Starter, Main, Dessert' name='mealtype' type="text" value={mealtype} />
          <input placeholder='Dietary' name='dietary' type="text" value={dietary} />
        </div>

        <textarea placeholder='Ingredients, seperated by commas' name='ingredients' type="text" value={ingredients} />
        <textarea placeholder='Method, seperated by commas' name='method' type="text" value={method} />
        <input placeholder='Image (Link)' name='image' type="text" value={image} />
      </>
    } else if (cat === 'Read') {
      const { title, description, genre, bookType, author, rating, image } = this.state.data
      form = <>
        <input placeholder='Title' name='title' type="text" value={title} />
        <textarea placeholder='Description' name='description' type="text" value={description} />

        <div className="short-inputs">
          <input placeholder='Genre' name='genre' type="text" value={genre} />
          <input placeholder='Book Type' name='bookType' type="text" value={bookType} />
          <input placeholder='Author' name='author' type="text" value={author} />
          <input name='rating' type="text" value={rating} />
        </div>

        <input placeholder='Image (Link)' name='link' type="text" value={image} />
      </>
    } else if (cat === 'Play') {
      const { title, description, genre, subcategory, format, players, duration, rating, link } = this.state.data
      form = <>
        <input placeholder='Title' name='title' type="text" value={title} />
        <textarea placeholder='Description' name='description' type="text" value={description} />

        <div className="short-inputs">
          <input placeholder='Genre' name='genre' type="text" value={genre} />
          <input placeholder='Subcategory' name='subcategory' type="text" value={subcategory} />
          <input placeholder='Format' name='format' type="text" value={format} />
          <input placeholder='Players' name='players' type="text" value={players} />
          <input placeholder='Duration' name='duration' type="text" value={duration} />
          <input name='rating' type="text" value={rating} />
        </div>

        <input placeholder='Link to game' name='link' type="text" value={link} />
      </>
    }
    return form
  }


  render() {
    const { category, subcategory } = this.state.data
    if (!this.state.data) return null
    return (
      <div className="edit-form">
        <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
          {this.formChooser(category, subcategory)}
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default EditCookForm
