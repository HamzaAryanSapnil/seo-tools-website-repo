import CreateBlogForm from '@/components/CreateBlogForm'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-7xl mx-auto p-4 font-roboto'>
      <h1 className='text-2xl font-bold my-10 text-center font-playfair-display'>Create Blog</h1>
      <CreateBlogForm/>
    </div>
  )
}

export default page
