import blogService from './../services/blogs'

const CreateBlog = ({
  setTitle,
  setAuthor,
  setUrl,
  title,
  author,
  url,
  setNotification,
  blogFormRef,
  updateBlogs
}) => {
  const handleCreate = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    blogService.create(blog)
    blogFormRef.current.toggleVisibility()
    updateBlogs()
    setNotification(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog