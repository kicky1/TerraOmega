import Axios from 'axios';

const apiWeb = Axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

apiWeb.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default apiWeb;