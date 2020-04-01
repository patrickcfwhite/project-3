import React, { createRef } from 'react'

const ReadForm = (props) => {

  return (
    <>
      <input placeholder='Title' name='title' type="text" />
      <input placeholder='Description' name='description' type="text" />

      <div className="short-inputs">
        <input placeholder='Genre' name='genre' type="text" />
        <input placeholder='Book Type' name='bookType' type="text" />
        <input placeholder='Author' name='author' type="text" />
        <input placeholder='Rating' name='rating' type="text" />
      </div>

      <input placeholder='Image (Link)' name='image' type="text" />


    </>
  )
}

export default ReadForm