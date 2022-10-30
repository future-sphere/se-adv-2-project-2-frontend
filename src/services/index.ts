import axios from 'axios';

const apiURL = 'http://localhost:8888';

const a = axios.create({
  baseURL: apiURL,
});

export default a;
