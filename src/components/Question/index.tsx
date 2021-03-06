import { useEffect, useState } from 'react';
import useSound from '../../hooks/use-sound';

import { Container, Alternative, QuestionContent } from './styles';
import { Modal } from '../Modal';
import { motion, useAnimation } from 'framer-motion';
import CorrectSound from '../../assets/correct.mp3';
import IncorrectSound from '../../assets/incorrect.mp3';

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

  const [playCorrect] = useSound(CorrectSound);
  const [playIncorrect] = useSound(IncorrectSound);

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
    const isCorrect =
      answerChosen.toLowerCase() === correctAnswer.toLowerCase();

    questionControls.start({
      y: -150,
      opacity: 0,
      transition: { duration: 0.1 },
    });

    questionControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.25 },
    });

    controls.result.start({
      y: -200,
      opacity: 0,
      transition: { duration: 0.1 },
    });

    controls.result.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.25 },
    });

    handlePassToNextQuestion();
    setIsModalOpen(false);

    if (isCorrect) {
      setCorrectAnswersAmount((prevAmount: number) => (prevAmount += 1));
      playCorrect();
      await controls.correct.start({ scale: 1.2 });
      controls.correct.start({ scale: 1 });
    } else {
      setIncorrectAnswersAmount((prevAmount: number) => (prevAmount += 1));
      playIncorrect();
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
        <QuestionContent
          isLarge={content?.length > 32}
          isSuperLarge={content?.length > 48}
        >
          {content}
        </QuestionContent>
      </motion.div>
      <motion.div className="alternatives">
        {alternatives?.map(({ id, content }: any) => (
          <Alternative
            key={id}
            className="alternative"
            onClick={() => handleAnswerQuestion(content)}
            isLarge={content?.length > 20}
            isSuperLarge={content?.length > 32}
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
