import React, { createRef } from 'react'

const WatchForm = (props) => {

  const { current } = props.current
  return (
    <>
      <input placeholder='Name' name='name' type="text" />
      <input placeholder='Description' name='description' type="text" />
      <div className="short-inputs">
        <input placeholder={current !== null ? current.innerHTML === 'Film' ? 'Duration' : 'Seasons' : null}
          name={current !== null ? current.innerHTML === 'Film' ? 'Duration' : 'Seasons' : null} type="text" />
        <input placeholder='Director' name='director' type="text" />
        <input placeholder='Rating' name='rating' type="text" />
        <input placeholder='Certficatation' name='certficatation' type="text" />
      </div>

      <input placeholder='Poster Link' name='poster' type="text" />
    </>
  )
}


export default WatchForm
