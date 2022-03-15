import { useState } from 'react';
import { Question } from '../Question';
import { Container, QuestionBoard } from './styles';
import GlobalStyles from '../../styles/global';
import { Modal } from '../Modal';

const questions = [
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
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [incorrectAnswersAmount, setIncorrectAnswersAmount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function handlePassToNextQuestion() {
    if (currentQuestion < questions.length - 1) {
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

  return (
    <>
      <GlobalStyles />
      <Container>
        <QuestionBoard>
          <div className="result-board">
            <div className="result">
              <p>Correct</p> <p>{correctAnswersAmount}</p>
            </div>
            <div className="result">
              <p>Incorrect</p> <p>{incorrectAnswersAmount}</p>
            </div>
          </div>
          <Question
            content={questions[currentQuestion].content}
            alternatives={questions[currentQuestion].alternatives}
            correctAnswer={questions[currentQuestion].correctAnswer}
            handlePassToNextQuestion={handlePassToNextQuestion}
            setCorrectAnswersAmount={setCorrectAnswersAmount}
            setIncorrectAnswersAmount={setIncorrectAnswersAmount}
          />
        </QuestionBoard>
        <Modal
          title="This is your results"
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
    </>
  );
}

export default App;
