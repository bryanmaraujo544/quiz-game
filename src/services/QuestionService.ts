import axios from './utils/HttpClient';

interface UpdateProps {
  participantId: number;
  correctAnswers: number;
  incorrectAnswers: number;
  secondsRest: number;
}

class QuestionService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('https://english-squiz-api.herokuapp.com');
  }

  async updateParticipant({
    participantId,
    correctAnswers,
    incorrectAnswers,
    secondsRest,
  }: UpdateProps) {
    return this.httpClient.put(`/participants/${participantId}`, {
      correctAnswers,
      incorrectAnswers,
      secondsRest,
    });
  }
}

export default new QuestionService();
