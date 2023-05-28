import request, { HttpVerb } from 'sync-request';
const url = '5000'
const port = 'http://localhost'
const SERVER_URL = `${url}:${port}`;

export function requestHelper(method: HttpVerb, path: string, payload: object, token : string|undefined = undefined) {
  let qs = {};
  let json = {};
  let headers = {};
  if (token !== undefined) {
    headers = { token };
  }
  if (['GET', 'DELETE'].includes(method)) {
    qs = payload;
  } else {
    json = payload;
  }
  const res = request(method, SERVER_URL + path, { qs, json, headers });
  if (res.statusCode !== 200) {
    return res.statusCode;
  }
  return JSON.parse(res.getBody() as string);
}