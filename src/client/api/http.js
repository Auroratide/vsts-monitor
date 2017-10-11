import axios from 'axios';

export default axios.create({
  headers: {
    baseUrl: 'http://localhost:3000',
    Accept: 'application/json'
  }
});