import axios from 'axios'
const baseUrl = 'https://phonebook-backend-51pvqmtnm-manuavalos-git.vercel.app/api/persons'

export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

export const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
export const delatePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
