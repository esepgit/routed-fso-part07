import { useEffect, useState } from "react"
import userService from "../services/userService"

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <td></td>
          <th>blogs created</th>
        </thead>
        {users.map((u) => {
          return <tr>
            <td>{u.name}</td>
            <td>{u.blogs.length}</td>
          </tr>
        })}
      </table>
    </>
  );
}

export default Users