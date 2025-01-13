import axios from 'axios';

const api = axios.create({
  baseURL: 'http://headlesswp.loc/wp-json/wp/v2/',
});

export const getPosts = async () => {
  const response = await api.get('posts');
  return response.data;
};
