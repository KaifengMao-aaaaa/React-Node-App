import axios from "axios";
import PATHS from './paths'
export const makeRequest = (method, path, options) => {
    if (PATHS[path] == null) {
      return Promise.reject(new Error("Don\'t worry - this is not part of iteration 2 so this error is expected"))
    }
    switch (method) {
      case 'GET':
        return axios.get(PATHS[path], { params: options });
      case 'POST':
        return axios.post(PATHS[path], options);
      case 'PUT':
        console.log(PATHS[path], options)
        return axios.put(PATHS[path], options);
      case 'DELETE':
        return axios.delete(PATHS[path], { params: options });
      default:
        console.log('yikes');
  }
}