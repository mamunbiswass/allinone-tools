import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function ToolCard({ tool }) {
  return (
    <div className='bg-white p-4 rounded-xl shadow hover:shadow-md'>
      <img src={tool.icon || '/default-icon.png'} alt={tool.name} className='w-16 h-16 mx-auto mb-3' />
      <h3 className='text-center font-semibold'>{tool.name}</h3>
      <p className='text-center text-sm text-gray-500 mb-3'>{tool.description?.slice(0, 50)}...</p>
      <Link to={`/${tool.slug}`} className='block text-center bg-blue-600 text-white p-2 rounded'>
        Use Tool
      </Link>
    </div>
  )
}

ToolCard.propTypes = {
  tool: PropTypes.object.isRequired
}
