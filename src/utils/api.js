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
      (error) => console.log('An error occured.', error)
    )
}

export const getPost = (id ='') => {
  return fetch(`${API_URL}/posts/${id}`, { headers: HEADERS })
    .then((response) => response.json()
    .then((data) => {
      data.post;
      console.log(data);
    }));
}
