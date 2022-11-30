import axios from 'axios';


const server_url=process.env.NEXT_PUBLIC_APIURL

const instance = axios.create({
  baseURL: server_url,
});


export default instance;