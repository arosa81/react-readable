var token = localStorage.token = Math.random().toString(36).substr(-10);

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

export const addPost = ({ id = Math.random().toString(36).substr(-10), timestamp = Date.now(), title, body, author, category }) => (
  fetch(`${API_URL}/posts`, {
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({ id, timestamp, title, body, author, category, })
   }).then(
      (response) => response.json(),
      (error) => console.error('getAllPostsAPI - An error occured.', error)
))

export const deletePost = (id = '') => (
  fetch(`${API_URL}/posts/${id}`, {
    headers: HEADERS,
    method: 'DELETE',
   }).then(
      (response) => {return;},
      (error) => console.error('delete post - An error occured.', error)
))

export const editPost = ({ id = '', timestamp = Date.now(), title, body, category }) => (
  fetch(`${API_URL}/posts/${id}`, {
    headers: HEADERS,
    method: 'PUT',
    body: JSON.stringify({ id, timestamp, title, body, category, })
   }).then(
      (response) => {return;},
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

export const getComment = (commentID = '') => (
  fetch(`${API_URL}/comments/${commentID}`, { headers: HEADERS })
    .then(
      (response) => response.json(),
      (error) => console.error('getComment - An error occured.', error)
))

export const addComment = ({ id = Math.random().toString(36).substr(-10), timestamp = Date.now(), body, author, parentId }) => (
  fetch(`${API_URL}/comments`, {
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({ id, timestamp, body, author, parentId })
   }).then(
      (response) => {return;},
      (error) => console.error('add comment - An error occured.', error)
))

export const deleteComment = (commentID = '') => (
  fetch(`${API_URL}/comments/${commentID}`, {
    headers: HEADERS,
    method: 'DELETE',
   }).then(
      (response) => {return;},
      (error) => console.error('delete post - An error occured.', error)
))

export const editComment = ({ id = '', timestamp = Date.now(), body }) => (
  fetch(`${API_URL}/comments/${id}`, {
    headers: HEADERS,
    method: 'PUT',
    body: JSON.stringify({ id, timestamp, body })
   }).then(
      (response) => {return;},
      (error) => console.error('edit comment - an error occured.', error)
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
