import { useParams } from "react-router-dom"

function User({ users, blogs }) {
  const userId = useParams().id
  const user = users.find(user => user.id === userId)
  console.log(user)
  console.log('blogs', blogs)

  if (!user) {
    return null
  }

  return (
    <section>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {blogs.map(blog => blog.user.name === user.name ? <li key={blog.id}>{blog.title}</li> : '')}
      </ul>
    </section>
  )
}

export default User