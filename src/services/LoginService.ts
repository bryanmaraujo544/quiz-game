import axios from './utils/HttpClient';

class LoginService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('http://localhost:5000');
  }

  async checkUsername(username: string) {
    return this.httpClient.get(`/participants/check/${username}`);
  }
}

export default new LoginService();
