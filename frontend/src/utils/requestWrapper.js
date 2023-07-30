import axios from 'axios';
import PATHS from './paths';
import { Rabbit, enc } from 'crypto-js';
export const makeRequest = (method, path, options, headers) => {
  if (PATHS[path] == null) {
    return Promise.reject(new Error("Don't worry - this is not part of iteration 2 so this error is expected"));
  }
  switch (method) {
    case 'GET':
      return axios.get(PATHS[path], { params: options, headers });
    case 'POST':
      return axios.post(PATHS[path], { ...options }, { headers });
    case 'PUT':
      return axios.put(PATHS[path], options, { headers });
    case 'DELETE':
      return axios.delete(PATHS[path], { params: options, headers });
    default:
      console.log('yikes');
  }
};
// 加密
export const encrypt = (data) => {
  return Rabbit.encrypt(String(data), 'MKF').toString();
};

// 解密
export const decrypt = (encryptedData) => {
  return Rabbit.decrypt(String(encryptedData), 'MKF').toString(enc.Utf8);
};
