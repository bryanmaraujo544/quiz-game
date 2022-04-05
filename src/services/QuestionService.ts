import axios from './utils/HttpClient';

interface UpdateProps {
  participantId: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

class QuestionService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('http://localhost:5000');
  }

  async updateParticipant({
    participantId,
    correctAnswers,
    incorrectAnswers,
  }: UpdateProps) {
    return this.httpClient.put(`/participants/${participantId}`, {
      correctAnswers,
      incorrectAnswers,
    });
  }
}

export default new QuestionService();
