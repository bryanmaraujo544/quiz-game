import { ResultBoard } from './styles';
import { Modal } from '../../../components/Modal';
import { useEffect } from 'react';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: any;
  correctAnswersAmount: number;
  incorrectAnswersAmount: number;
  handleRestartQuiz: any;
}

export const ResultModal = ({
  isModalOpen,
  setIsModalOpen,
  correctAnswersAmount,
  incorrectAnswersAmount,
  handleRestartQuiz,
}: Props) => {
  console.log('result modal');
  useEffect(() => {
    if (!isModalOpen) {
      handleRestartQuiz();
    }
  }, [isModalOpen]);

  return (
    <Modal
      title="These are your results"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <ResultBoard>
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
      </ResultBoard>
    </Modal>
  );
};
