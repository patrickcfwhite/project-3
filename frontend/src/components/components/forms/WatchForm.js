import React, { createRef } from 'react'

const WatchForm = (props) => {

  const { current } = props.current
  return (
    <>
      <input placeholder='Name' name='title' type="text" />
      <input placeholder='Description' name='description' type="text" />
      <input placeholder='Director' name='director' type="text" />
      <div className="short-inputs">
        <input placeholder={current !== null ? current.innerHTML === 'film' ? 'Duration' : 'Seasons' : null}
          name={current !== null ? current.innerHTML === 'film' ? 'Duration' : 'Seasons' : null} type="text" />
        <input value={current !== null ? current.innerHTML === 'film' ? 'Film' : 'TV Series' : null}  name='subcategory' readOnly/>
        <input placeholder='Rating' name='rating' type="text" />
        <input placeholder='Certification' name='certification' type="text" />
      </div>
      <input placeholder='Poster Link' name='image' type="text" />
    </>
  )
}


export default WatchForm
