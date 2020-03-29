import React, { createRef } from 'react'

const CookForm = (props) => {

  const { current } = props.current
  return (
    <>
        <input placeholder='Title' name='title' type="text" />
        <input placeholder='Description' name='description' type="text" />
        <input placeholder='' name='rating' type="text" />
        <input placeholder='Certficatation' name='certficatation' type="text" />
        <input placeholder='ingredients' name='ingredients' type="text" />
        <input placeholder='Director' name='director' type="text" />
        
        <input placeholder='Poster Link' name='poster' type="text" />
    </>
  )
}

title: { type: String, required: true, unique: true },
ingredients: { type: Array, required: true },
description: { type: String, required: true, maxlength: 1000 },
image: { type: String, required: false },
method: { type: Array, required: true },
prepTime: { type: String, required: true },
cookTime: { type: String, required: true },
serves: { type: String, required: true },
rating: { type: Number, required: true },
category: { type: String, required: true },
mealtype: { type: String, required: true },
dietary: { type: Array, required: true },

export default CookForm
