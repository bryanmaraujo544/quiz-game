import axios from 'axios';

const httpClient = (baseURL: string) => {
  return axios.create({ baseURL });
};

export default httpClient;
