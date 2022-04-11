import axios from './utils/HttpClient';

interface Participant {
  username?: string;
  gameroomId: number;
}

class RoomService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('https://english-squiz-api.herokuapp.com');
  }

  async listQuestions(roomId: number) {
    const { data } = await this.httpClient.get(`/questions/${roomId}`);
    return data;
  }

  async createGameroom({ roomId }: { roomId: number }) {
    const { data } = await this.httpClient.post('/gamerooms', { roomId });
    return data;
  }

  async getGameroomOfRoom({ roomId }: { roomId: number }) {
    const { data } = await this.httpClient.get(`/gamerooms/${roomId}`);
    return data;
  }

  async createParticipant({ username, gameroomId }: Participant) {
    const { data } = await this.httpClient.post('/participants', {
      username,
      gameroomId,
    });
    return data;
  }

  async getResult({ gameroomId }: Participant) {
    const { data } = await this.httpClient.get(
      `/gamerooms/results/${gameroomId}`
    );

    return data;
  }
}

export default new RoomService();
