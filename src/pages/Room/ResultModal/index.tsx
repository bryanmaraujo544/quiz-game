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
      title="Results"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    >
      <ResultBoard>
        <div className="result-board">
          <h3 className="title">Your results</h3>
          <div className="results">
            <div className="result">
              <p>Correct</p> <p>{correctAnswersAmount}</p>
            </div>
            <div className="result">
              <p>Incorrect</p> <p>{incorrectAnswersAmount}</p>
            </div>
          </div>
        </div>
        <div className="ranking">
          <h3 className="title">Ranking</h3>
          {new Array(10).fill('bryan').map((name) => (
            <p className="user">{name}</p>
          ))}
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
