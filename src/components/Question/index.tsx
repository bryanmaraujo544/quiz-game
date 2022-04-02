import { useEffect, useState } from 'react';
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
  controls: any;
}

export const Question = ({
  content,
  alternatives,
  correctAnswer,
  setCorrectAnswersAmount,
  setIncorrectAnswersAmount,
  handlePassToNextQuestion,
  controls,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answerChosen, setAnswerChosen] = useState('');

  const questionControls = useAnimation();

  useEffect(() => {
    (async () => {
      await controls.result.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.35,
        },
      });
      questionControls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      });
    })();
  });

  function handleAnswerQuestion(answer: string) {
    setAnswerChosen(answer);
    setIsModalOpen(true);
  }

  async function handleConfirmAnswer() {
    const isCorrect = answerChosen === correctAnswer;
    await questionControls.start({
      y: -150,
      opacity: 0,
      transition: { duration: 0.1 },
    });
    questionControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.25 },
    });

    await controls.result.start({
      y: -200,
      opacity: 0,
      transition: { duration: 0.1 },
    });

    await controls.result.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.25 },
    });

    setIsModalOpen(false);
    handlePassToNextQuestion();

    if (isCorrect) {
      setCorrectAnswersAmount((prevAmount: number) => (prevAmount += 1));
      await controls.correct.start({ scale: 1.2 });
      controls.correct.start({ scale: 1 });
    } else {
      setIncorrectAnswersAmount((prevAmount: number) => (prevAmount += 1));
      await controls.incorrect.start({ scale: 1.2 });
      controls.incorrect.start({ scale: 1 });
    }
  }

  return (
    <Container
      isLarge={content?.length > 48}
      as={motion.div}
      animate={questionControls}
      initial={{ y: -100, opacity: 0 }}
    >
      <motion.div className="question-container">
        <p className="question">{content}</p>
      </motion.div>
      <motion.div className="alternatives">
        {alternatives?.map(({ id, content }: any) => (
          <Alternative
            key={id}
            className="alternative"
            onClick={() => handleAnswerQuestion(content)}
          >
            {content}
          </Alternative>
        ))}
      </motion.div>
      <Modal
        title="Confirm you answer?"
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
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
