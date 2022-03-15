import { useState } from 'react';
import { Container, Alternative } from './styles';
import { Modal } from '../Modal';

interface Props {
  content: string;
  alternatives: string[];
  correctAnswer: string;
  handlePassToNextQuestion: any;
  setCorrectAnswersAmount: any;
  setIncorrectAnswersAmount: any;
}

export const Question = ({
  content,
  alternatives,
  correctAnswer,
  setCorrectAnswersAmount,
  setIncorrectAnswersAmount,
  handlePassToNextQuestion,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerChosen, setAnswerChosen] = useState('');

  function handleAnswerQuestion(answer: string) {
    setAnswerChosen(answer);
    setIsModalOpen(true);
  }

  function handleConfirmAnswer() {
    const isCorrect = answerChosen === correctAnswer;
    console.log({ isCorrect });

    if (isCorrect) {
      // TODO: handle to pass
      setCorrectAnswersAmount((prevAmount: number) => (prevAmount += 1));
    } else {
      setIncorrectAnswersAmount((prevAmount: number) => (prevAmount += 1));
    }

    handlePassToNextQuestion();
    setIsModalOpen(false);
  }

  // function

  return (
    <Container isLarge={content.length > 48}>
      <div className="question-container">
        <p className="question">{content}</p>
      </div>
      <div className="alternatives">
        {alternatives.map((alternative) => (
          <Alternative
            className="alternative"
            onClick={() => handleAnswerQuestion(alternative)}
          >
            {alternative}
          </Alternative>
        ))}
      </div>
      <Modal
        title="Confirm you answer?"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <div className="buttons">
          <button type="button" onClick={() => setIsModalOpen(false)}>
            No
          </button>
          <button type="button" onClick={() => handleConfirmAnswer()}>
            Yes
          </button>
        </div>
      </Modal>
    </Container>
  );
};
