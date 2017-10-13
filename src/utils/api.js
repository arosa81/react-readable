const API_URL = 'http://localhost:3001'
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'TOKEN_TBD',
}

export const getAllPostsAPI = () => {
  return fetch(`${API_URL}/posts`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.warn('getAllPostsAPI - An error occured.', error)
    )
}

export const getPost = (id = '') => {
  return fetch(`${API_URL}/posts/${id}`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.warn('getPost - An error occured.', error)
    );
}

export const getAllCategories = () => {
  return fetch(`${API_URL}/categories`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.warn('getAllPostsAPI - An error occured.', error)
    )
}

export const getPostByCategory = (category) => {
  return fetch(`${API_URL}/${category}/posts`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.warn('getPost - An error occured.', error)
    );
}
