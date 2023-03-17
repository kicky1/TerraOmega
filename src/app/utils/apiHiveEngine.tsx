import Axios from "axios";

const apiHive = Axios.create({
  baseURL: "https://enginerpc.com/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

apiHive.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    console.error("Error", error);
    return Promise.reject(error);
  }
);

export default apiHive;
