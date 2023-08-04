// export default function handler(req, res) {
//     res.status(200).setHeader('Access-Control-Allow-Origin', '*').json({ name: 'Fake Upload Process' });
// }

import axios from "axios";

const instance = axios.create({
  baseURL:'https://mapp.pubsilon.com',
  // headers:{
  //   'Content-Type':'application/json',
  //   'Accept':'application/json',
  // },
  // headers: {
  //   'Content-Type': 'multipart/form-data'
  // },
  withCredentials:true
});

instance.interceptors.request.use(async(config) => {
  const publicUrls = ['/auth/token']
  const isPublicUrl = publicUrls.includes(config.url);
  const token = localStorage.getItem('auth_token');
  if (!isPublicUrl) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;