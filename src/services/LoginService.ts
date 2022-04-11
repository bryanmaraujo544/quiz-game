import axios from './utils/HttpClient';

class LoginService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('https://english-squiz-api.herokuapp.com/');
  }

  async checkUsername(username: string) {
    const { data } = await this.httpClient.get(
      `/participants/check/${username}`
    );
    return data;
  }
}

export default new LoginService();
