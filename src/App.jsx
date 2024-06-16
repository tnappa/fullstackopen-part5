import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => { updateBlogs() }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    color: 'green',
    marginBottom: 10
  }
  const errorStyle = {
    background: 'lightgrey',
    fontSize: 20,
    color: 'red',
    marginBottom: 10
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const updateBlogs = () => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sorted)
    })
  }

  if (user === null) {
    return (
      <div>
        <div style={errorStyle}>
          {errorMessage}
        </div>
        <LoginForm
          setUser={setUser}
          setErrorMessage={setErrorMessage}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div style={notificationStyle}>
        {notification}
      </div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlog
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          title={title}
          author={author}
          url={url}
          setNotification={setNotification}
          blogFormRef={blogFormRef}
          updateBlogs={updateBlogs}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} user={user} />
      )}
    </div>
  )
}

export default App