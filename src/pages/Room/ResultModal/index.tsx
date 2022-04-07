import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { ResultBoard, User } from './styles';
import { Modal } from '../../../components/Modal';
import RoomService from '../../../services/RoomService';
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: any;
  correctAnswersAmount: number;
  incorrectAnswersAmount: number;
  handleRestartQuiz: any;
  handleExitRoom: any;
  gameroomId: number;
  shallShowResults: boolean;
}

export const ResultModal = ({
  isModalOpen,
  setIsModalOpen,
  correctAnswersAmount,
  incorrectAnswersAmount,
  handleExitRoom,
  gameroomId,
  shallShowResults,
}: Props) => {
  const [ranking, setRanking] = useState([]);
  const usernameInStorage = localStorage.getItem('username');

  async function handleCloseModal() {
    setIsModalOpen(false);
    handleExitRoom();
  }

  useEffect(() => {
    (async () => {
      if (shallShowResults) {
        console.log('GameroomId in ResultModal', gameroomId);
        const results = await RoomService.getResult({ gameroomId });
        console.log({ results });
        setRanking(results.participants);
      }
    })();
  }, [shallShowResults]);

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
              <p>Correct: {correctAnswersAmount}</p>
            </div>
            <div className="result">
              <p>Incorrect: {incorrectAnswersAmount}</p>
            </div>
          </div>
        </div>
        <div className="ranking">
          <h3 className="title">Ranking</h3>
          {ranking.map(
            (
              { id, username }: { id: number; username: string },
              index: number
            ) => (
              <User
                className="user"
                key={`ranking-${id}`}
                index={index}
                length={ranking.length}
              >
                {username}
                {username === usernameInStorage && (
                  <IoIosArrowForward className="arrow-icon" />
                )}
              </User>
            )
          )}
        </div>

        <button
          type="button"
          className="reset-btn"
          onClick={() => handleCloseModal()}
        >
          Home Page
        </button>
      </ResultBoard>
    </Modal>
  );
};
