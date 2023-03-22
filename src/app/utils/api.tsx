import Axios from "axios";

const api = Axios.create({
  baseURL: "https://terracore.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    console.error("Error", error);
    switch (error.response.status) {
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default api;
