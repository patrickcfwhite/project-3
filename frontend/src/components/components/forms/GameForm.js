import React, { createRef } from 'react'

const GameForm = (props) => {

  return (
    <>
      <input placeholder='Title' name='title' type="text" />
      <textarea placeholder='Description' name='description' type="text" />

      <div className="short-inputs">
        <input placeholder='Genre' name='genre' type="text" />
        <input placeholder='Subcategory' name='subcategory' type="text" />
        <input placeholder='Format' name='format' type="text" />
        <input placeholder='Players' name='players' type="text" />
        <input placeholder='Duration' name='duration' type="text" />
        <input placeholder='Rating' name='rating' type="text" />
      </div>

      <input placeholder='Link to game' name='link' type="text" />


    </>
  )
}

export default GameForm
