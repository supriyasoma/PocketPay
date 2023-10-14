import axios from 'axios';
export default axios.create({
  baseURL: "https://bc94api.zemoso.tk/",
  headers: {
    'content-Type': 'application/json',
  },
});