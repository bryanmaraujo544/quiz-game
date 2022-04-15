import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { IoIosArrowForward } from 'react-icons/io';
import useSound from '../../../hooks/use-sound';

import { ResultBoard, User, CongratsContainer } from './styles';
import { Modal } from '../../../components/Modal';
import RoomService from '../../../services/RoomService';
import CongratsSound from '../../../assets/congrats.mp3';

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

interface Participant {
  id: number;
  username: string;
  correct_answers: number;
  seconds_rest: number;
}

const containerVariants = {
  hidden: {
    opacity: 0,
    display: 'none',
    transition: {
      when: 'afterChildren',
    },
  },
  visible: {
    opacity: 1,
    display: 'flex',
    transition: {
      delay: 0.5,
      when: 'beforeChildren',
    },
  },
};

const textVariants = {
  hidden: {},
  visible: {
    opacity: 1,
    y: 0,
    // transition: {
    //   staggerChildren: 0.5,
    // },
  },
};

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
  const [shallShowCongrats, setShallShowCongrats] = useState(false);
  const usernameInStorage = localStorage.getItem('username');

  const congratsControls = useAnimation();
  const textControls = useAnimation();

  const [playCongrats] = useSound(CongratsSound);

  useEffect(() => {
    (async () => {
      if (shallShowResults) {
        const results = await RoomService.getResult({ gameroomId });
        setRanking(results.participants);
        if (results.participants[0]?.username === usernameInStorage) {
          setShallShowCongrats(true);
        }
      }
    })();
  }, [shallShowResults]);

  useEffect(() => {
    (async () => {
      if (shallShowCongrats) {
        congratsControls.start('visible');
        textControls.start((i) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i === 1 ? 1 : 1.75 },
        }));
        playCongrats();

        setTimeout(() => {
          congratsControls.start('hidden');
          setShallShowCongrats(false);
        }, 6000);
      }
    })();
  }, [shallShowCongrats]);

  async function handleCloseModal() {
    setIsModalOpen(false);
    handleExitRoom();
  }

  return (
    <>
      <CongratsContainer
        as={motion.div}
        variants={containerVariants}
        animate={congratsControls}
      >
        <motion.p
          custom={1}
          variants={textVariants}
          initial={{ opacity: 0, y: 100 }}
          animate={textControls}
          className="congrats-text"
        >
          Congratulations <b className="winner">{usernameInStorage}</b>!!!
        </motion.p>
        <motion.p
          custom={2}
          initial={{ opacity: 0, y: 100 }}
          animate={textControls}
          className="congrats-text"
        >
          You won the quiz!
        </motion.p>
      </CongratsContainer>
      <Modal
        title="Results"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        delayToOpen={0.5}
        style={{
          display: isModalOpen ? (shallShowCongrats ? 'none' : 'flex') : 'none',
        }}
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
                { id, username, correct_answers, seconds_rest }: Participant,
                index: number
              ) => (
                <User
                  className="user"
                  key={`ranking-${id}`}
                  index={index}
                  length={ranking.length}
                >
                  <p>{username}</p>

                  <b className="correct-answers">{correct_answers}</b>
                  <b className="time">
                    {seconds_rest === 60 ? '60s' : `${60 - seconds_rest}s`}
                    {username === usernameInStorage && (
                      <IoIosArrowForward className="arrow-icon" />
                    )}
                  </b>
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
    </>
  );
};
