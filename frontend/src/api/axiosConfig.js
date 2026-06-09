import axios from 'axios';

const api = axios.create({
    baseURL:  'https://real-time-chat-application-x0ts.onrender.com',
    withCredentials: true // Cookies (JWT) imp
});

export default api;











// import axios from 'axios';

// const api = axios.create({
//     // baseURL: 'http://localhost:3000',  <-- Isko hata do
//     baseURL: 'https://real-time-chat-application-x0ts.onrender.com', // <-- Apna live link yahan daal do
//     withCredentials: true // Cookies (JWT) imp
// });

// export default api;