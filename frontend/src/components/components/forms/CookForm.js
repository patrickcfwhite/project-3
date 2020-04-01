import React, { createRef } from 'react'

const CookForm = (props) => {

  return (
    <>
      <input placeholder='Title' name='title' type="text" />
      <textarea className='box-input' placeholder='Description' name='description' type="text" />

      <div className="short-inputs">
        <input placeholder='Serves' name='serves' type="text" />
        <input placeholder='Prep Time' name='prepTime' type="text" />
        <input placeholder='Cook Time' name='cookTime' type="text" />
        <input placeholder='Rating' name='rating' type="text" />
        <input placeholder='Starter, Main, Dessert' name='mealtype' type="text" />
        <input placeholder='Dietary' name='dietary' type="text" />
      </div>

      <textarea placeholder='Ingredients, seperated by commas' name='ingredients' type="text" />
      <textarea placeholder='Method, seperated by commas' name='method' type="text" />
      <input placeholder='Image (Link)' name='image' type="text" />


    </>
  )
}

export default CookForm
