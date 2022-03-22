import { useState } from 'react';
import { Container, Alternative } from './styles';
import { Modal } from '../Modal';
import { motion, useAnimation } from 'framer-motion';
interface Props {
  content: string;
  alternatives: string[];
  correctAnswer: string;
  handlePassToNextQuestion: any;
  setCorrectAnswersAmount: any;
  setIncorrectAnswersAmount: any;
  resultControls: any;
}

export const Question = ({
  content,
  alternatives,
  correctAnswer,
  setCorrectAnswersAmount,
  setIncorrectAnswersAmount,
  handlePassToNextQuestion,
  resultControls,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerChosen, setAnswerChosen] = useState('');

  const alternativesControls = useAnimation();
  const contentControls = useAnimation();
  const questionControls = useAnimation();

  function handleAnswerQuestion(answer: string) {
    setAnswerChosen(answer);
    setIsModalOpen(true);
  }

  async function handleConfirmAnswer() {
    const isCorrect = answerChosen === correctAnswer;

    setIsModalOpen(false);
    await questionControls.start({
      y: -150,
      opacity: 0,
    });
    questionControls.start({
      y: 0,
      opacity: 1,
    });

    await resultControls.start({
      y: -200,
      opacity: 0,
    });
    resultControls.start({
      y: 0,
      opacity: 1,
    });

    if (isCorrect) {
      // TODO: handle to pass
      setCorrectAnswersAmount((prevAmount: number) => (prevAmount += 1));
    } else {
      setIncorrectAnswersAmount((prevAmount: number) => (prevAmount += 1));
    }

    handlePassToNextQuestion();
  }

  // function

  return (
    <Container
      isLarge={content?.length > 48}
      as={motion.div}
      animate={questionControls}
    >
      <motion.div className="question-container">
        <p className="question">{content}</p>
      </motion.div>
      <motion.div className="alternatives">
        {alternatives?.map((alternative) => (
          <Alternative
            className="alternative"
            onClick={() => handleAnswerQuestion(alternative)}
          >
            {alternative}
          </Alternative>
        ))}
      </motion.div>
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
