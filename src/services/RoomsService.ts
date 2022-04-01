import axios from './utils/HttpClient';

class RoomsService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('http://localhost:5000');
  }

  async listAllGamerooms() {
    return this.httpClient.get('/gamerooms');
  }
}

export default new RoomsService();
