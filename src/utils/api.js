var uid = require('rand-token').uid;
var token = localStorage.token = uid(16);

const API_URL = 'http://localhost:3001'
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token,
}

export const getPosts = () => {
  return fetch(`${API_URL}/posts`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getAllPostsAPI - An error occured.', error)
    )
}

export const getPost = (id = '') => {
  return fetch(`${API_URL}/posts/${id}`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getPost - An error occured.', error)
    );
}

export const getCategories = () => {
  return fetch(`${API_URL}/categories`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getAllPostsAPI - An error occured.', error)
    )
}

export const getPostByCategory = (category) => {
  return fetch(`${API_URL}/${category}/posts`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getPost - An error occured.', error)
    );
}

export const votePost = (id = '', voteOption) => {
  return fetch(`${API_URL}/posts/${id}`, {
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({ option: voteOption }),
  }).then(
    (response) => response.json(),
    (error) => console.error('votePost - An error occured.', error)
  )
}

export const voteComment = (id = '', voteOption) => {
  return fetch(`${API_URL}/comments/${id}`, {
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({ option: voteOption }),
  }).then(
    (response) => response.json(),
    (error) => console.error('voteComment - An error occured.', error)
  )
}
