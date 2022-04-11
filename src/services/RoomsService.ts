import axios from './utils/HttpClient';

class RoomsService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('https://english-squiz-api.herokuapp.com');
  }

  async listAllRooms() {
    return this.httpClient.get('/rooms');
  }

  async listAllGamerooms() {
    return this.httpClient.get('/gamerooms');
  }
}

export default new RoomsService();
