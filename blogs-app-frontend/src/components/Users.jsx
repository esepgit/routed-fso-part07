import { useEffect, useState } from "react"
import userService from "../services/userService"
import User from "./User"
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom'

function UsersTable({ users }) {
  console.log('user', users)
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
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
          })}
        </tbody>
      </table>
    </>
  );
}

function Users({ blogs }) {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UsersTable users={users} />} />
        <Route path="/users/:id" element={<User users={users} blogs={blogs} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Users