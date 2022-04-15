import axios from './utils/HttpClient';

interface QuestionProps {
  roomId: number;
  questionContent: string;
  correctAnswer: string;
}

interface Alternative {
  alternativeContent: string;
  questionId: number;
}

interface Room {
  roomTitle: string;
  photoURL: string;
}

class AdminService {
  httpClient: any;

  constructor() {
    this.httpClient = axios('https://english-squiz-api.herokuapp.com');
  }

  async createQuestion({
    roomId,
    questionContent,
    correctAnswer,
  }: QuestionProps) {
    console.log({ roomId, questionContent, correctAnswer });
    const { data } = await this.httpClient.post('/questions', {
      roomId,
      content: questionContent,
      correctAnswer,
    });
    return data;
  }

  async createAlternative({ alternativeContent, questionId }: Alternative) {
    const { data } = await this.httpClient.post('/alternatives', {
      content: alternativeContent,
      questionId,
    });
    return data;
  }

  async createRoom({ roomTitle, photoURL }: Room) {
    const { data } = await this.httpClient.post('/rooms', {
      title: roomTitle,
      photoUrl: photoURL,
    });

    return data;
  }
}

export default new AdminService();
