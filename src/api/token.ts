import axios from "axios";
import httpClient from "./http-client";

export function getToken() {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  axios.post(
    import.meta.env.VITE_APP_TOKEN_URL,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${import.meta.env.VITE_APP_AUTH}`
      }
    }
  ).then((res) => {
    const token = res.data.access_token;
    httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }).catch((error) => {
    console.error(error);
  })
}