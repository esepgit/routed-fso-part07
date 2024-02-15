import { Link } from 'react-router-dom'

function Users({ users }) {
  
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
              return <tr key={u.username}>
                <td>
                  <Link to={`${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
          })}
        </tbody>
      </table>
    </>
  );
}

export default Users