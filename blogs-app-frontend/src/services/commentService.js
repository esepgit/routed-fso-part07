import axios from "axios"
const baseUrl = '/api/blogs'

const create = async (url, comment) => {
  console.log(url, comment)
  const response = axios.post(`${baseUrl}${url}`, { content: comment })
  return response.then(res => res.data)
}

export default { create }