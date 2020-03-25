import React from 'react'




const Form = (props) => {
  const { name, origin, image, tastingNotes } = data
  const { handleSubmit, handleChange, errors, data } = props
  return (
    <form className="form" onSubmit={(event) => handleSubmit(event)}>
      <div className="field">
        <label className="label">
          Title
        </label>
        <div className="control">
          <input
            className="input"
            onChange={(event) => handleChange(event)}
            type="text"
            name="name"
            placeholder=""
            value={name}
          />
        </div>
        {errors.name && <small className='help is-danger'>{errors.name}</small>}
      </div>
      <div className="field">
        <label className="label">
          Director
        </label>
        <div className="control">
          <input
            className="input"
            onChange={(event) => handleChange(event)}
            type="text"
            name="origin"
            placeholder=""
            value={origin}
          />
        </div>
        {errors.origin && <small className='help is-danger'>{errors.origin}</small>}
      </div>
      <div className="field">
        <label className="label">
          Image
        </label>
        <div className="control">
          <input
            className="input"
            onChange={(event) => handleChange(event)}
            type="text"
            name="image"
            placeholder=""
            value={image}
          />
        </div>
        {errors.image && <small className='help is-danger'>{errors.image}</small>}
      </div>
      <div className="field">
        <label className="label">
          x
        </label>
        <div className="control">
          <input
            className="input"
            onChange={(event) => handleChange(event)}
            type="text"
            name="x"
            placeholder=""
            value={x}
          />
        </div>
        {errors.x && <small className='help is-danger'>{errors.x}</small>}
      </div>
      <div className="field">
        <label className="label">
          x
        </label>
        <div className="control">
          <input
            className="input"
            onChange={(event) => handleChange(event)}
            type="text"
            name="x"
            placeholder=""
            value={x}
          />
        </div>
        {errors.x && <small className='help is-danger'>{errors.x}</small>}
      </div>
      <div className="field">
        <label className="label">
          x
        </label>
        <div className="control">
          <input
            className="input"
            onChange={(event) => handleChange(event)}
            type="text"
            name="x"
            placeholder=""
            value={x}
          />
        </div>
        {errors.x && <small className='help is-danger'>{errors.x}</small>}
      </div>
      <button className='button is-warning'>Add Cheese</button>
    </form>
  )
}