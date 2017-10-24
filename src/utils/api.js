var uid = require('rand-token').uid;
var token = localStorage.token = uid(16);

const API_URL = 'http://localhost:3001'
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token,
}

export const getPosts = () => (
  fetch(`${API_URL}/posts`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getAllPostsAPI - An error occured.', error)
))

export const getPost = (id = '') => (
  fetch(`${API_URL}/posts/${id}`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getPost - An error occured.', error)
))

export const addPost = ({ id, timestamp, title, body, author, category }) => (
  fetch(`${API_URL}/posts`, {
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({
      id,
      timestamp,
      title,
      body,
      author,
      category,
    })
   }).then(
      (response) => response.json(),
      (error) => console.error('getAllPostsAPI - An error occured.', error)
))

export const getCategories = () => (
  fetch(`${API_URL}/categories`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getAllPostsAPI - An error occured.', error)
))

export const getPostByCategory = (category) => (
  fetch(`${API_URL}/${category}/posts`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getPost - An error occured.', error)
))

export const votePost = (id = '', voteOption) => (
  fetch(`${API_URL}/posts/${id}`, {
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({ option: voteOption }),
  }).then(
    (response) => response.json(),
    (error) => console.error('votePost - An error occured.', error)
))

export const getComments = (postID = '') => (
  fetch(`${API_URL}/posts/${postID}/comments`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getComments - An error occured.', error)
))

export const getComment = (postID = '') => (
  fetch(`${API_URL}/comments/${postID}`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getComment - An error occured.', error)
))

export const voteComment = (id = '', voteOption) => (
  fetch(`${API_URL}/comments/${id}`, {
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({ option: voteOption }),
  }).then(
    (response) => response.json(),
    (error) => console.error('voteComment - An error occured.', error)
))
