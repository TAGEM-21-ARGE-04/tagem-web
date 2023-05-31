import axios from "utils/Api";

// Axios'un global yapılandırmasını yapalım
axios.interceptors.response.use(
    (response) => {
      // Yanıt işleme kodlarını burada gerçekleştirin
      return response.data.data;
    },
    (error) => {
      if (error.response) {
        console.log('Response Error:', error.response);
      } else if (error.request) {
        console.log('Request Error:', error.request);
      } else {
        console.log('Error:', error.message);
      }
      return Promise.reject(error);
    }
);