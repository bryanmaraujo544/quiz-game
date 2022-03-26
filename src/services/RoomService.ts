import axios from './utils/HttpClient';

class RoomService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('http://localhost:5000');
  }

  async listQuestions(roomId: number) {
    return this.httpClient.get(`/questions/${roomId}`);
  }
}

export default new RoomService();
