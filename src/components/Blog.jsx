import { useState } from 'react'
import axios from 'axios'
const baseUrl = '/api/blogs'

const Blog = ({ blog, updateBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showForCreator = { display: (blog.user.name === user.name) ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = async () => {
    const newBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    await axios.put(baseUrl + '/' + blog.id, newBlog)
    updateBlogs()
  }

  const deleteBlog = async () => {
    if (window.confirm('Remove blog ' + blog.name + ' by ' + blog.author + '?')) {
      await axios.delete(baseUrl + '/' + blog.id)
      updateBlogs()
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
        <button style={showForCreator} onClick={deleteBlog}>delete</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={incrementLikes}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog