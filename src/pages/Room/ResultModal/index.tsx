import { ResultBoard } from './styles';
import { Modal } from '../../../components/Modal';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: any;
  correctAnswersAmount: number;
  incorrectAnswersAmount: number;
  handleRestartQuiz: any;
  handleExitRoom: any;
}

export const ResultModal = ({
  isModalOpen,
  setIsModalOpen,
  correctAnswersAmount,
  incorrectAnswersAmount,
  handleExitRoom,
}: Props) => {
  async function handleCloseModal() {
    setIsModalOpen(false);
    handleExitRoom();
  }

  return (
    <Modal
      title="Results"
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      delayToOpen={0.5}
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
          onClick={() => handleCloseModal()}
        >
          Reset
        </button>
      </ResultBoard>
    </Modal>
  );
};
