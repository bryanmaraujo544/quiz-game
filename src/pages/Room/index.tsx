import { useEffect, useState } from 'react';
import { Container, QuestionBoard } from './styles';
import { Question } from '../../components/Question';
import { Modal } from '../../components/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const rooms = [
  {
    id: 10,
    title: 'Football Questions',
    questions: [
      {
        content: 'Quem ganhou a copa de 2018?',
        alternatives: ['Brasil', 'Alemanha', 'Espanha', 'França'],
        correctAnswer: 'França',
      },
      {
        content: 'Quem ganhou a copa de 2010?',
        alternatives: ['Itálica', 'Argentina', 'Espanha', 'Gana'],
        correctAnswer: 'Espanha',
      },
      {
        content: 'Qual linguagem é a "evolução" do JavaScript',
        alternatives: ['Ruby', 'TypeScript', 'PHP', 'CoffeScript'],
        correctAnswer: 'TypeScript',
      },
    ],
  },
  {
    id: 20,
    title: 'Trap Questions',
    questions: [
      {
        content: 'Qual o nome do único album do Matuê?',
        alternatives: ['É Sal', 'Astroworld', 'Máquina do Tempo', '777-666'],
        correctAnswer: 'Máquina do Tempo',
      },
      {
        content: 'Qual destas músicas é do Kyan',
        alternatives: ['Oi, como cê tá', 'Trap de gringo', 'É sal', 'Anos-luz'],
        correctAnswer: 'Trap de gringo',
      },
    ],
  },
];

export const Room = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [incorrectAnswersAmount, setIncorrectAnswersAmount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([] as any);
  console.log({ questions });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const resultControls = useAnimation();

  useEffect(() => {
    const questionsOfRoom = rooms.find((room) => room.id === Number(roomId))
      ?.questions as any;

    console.log({ questionsOfRoom });
    setQuestions(questionsOfRoom);
  }, []);

  function handlePassToNextQuestion() {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion((prevCurrent) => (prevCurrent += 1));
    } else {
      // End of the quiz
      setIsModalOpen(true);
    }
  }

  function handleRestartQuiz() {
    setCorrectAnswersAmount(0);
    setIncorrectAnswersAmount(0);
    setCurrentQuestion(0);
    setIsModalOpen(false);
  }

  if (questions.length < 0) {
    return <h1>loading</h1>;
  }

  return (
    <Container>
      <QuestionBoard>
        <motion.div
          className="result-board"
          animate={resultControls}
          initial={{ y: -100, opacity: 0 }}
        >
          <div className="result">
            <p>Correct</p> <p>{correctAnswersAmount}</p>
          </div>
          <div className="result">
            <p>Incorrect</p> <p>{incorrectAnswersAmount}</p>
          </div>
          <div className="home-button" onClick={() => navigate('/')}>
            Home
          </div>
        </motion.div>
        <Question
          content={questions[currentQuestion]?.content}
          alternatives={questions[currentQuestion]?.alternatives}
          correctAnswer={questions[currentQuestion]?.correctAnswer}
          handlePassToNextQuestion={handlePassToNextQuestion}
          setCorrectAnswersAmount={setCorrectAnswersAmount}
          setIncorrectAnswersAmount={setIncorrectAnswersAmount}
          resultControls={resultControls}
        />
      </QuestionBoard>
      <Modal
        title="These are your results"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <div className="result-board">
          <div className="result">
            <p>Correct</p> <p>{correctAnswersAmount}</p>
          </div>
          <div className="result">
            <p>Incorrect</p> <p>{incorrectAnswersAmount}</p>
          </div>
        </div>
        <button
          type="button"
          className="reset-btn"
          onClick={() => handleRestartQuiz()}
        >
          Reset
        </button>
      </Modal>
    </Container>
  );
};
