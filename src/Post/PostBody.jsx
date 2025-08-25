import React from 'react'

export default function PostBody({caption,image}) {
  return (
    <div>
    {caption && <p>{caption}</p>}
    {image && <img src={image} className='w-full h-100 object-cover mt-2' alt="" />}

    </div>
  )
}
