import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, useAnimation } from 'framer-motion';

import RoomService from '../../services/RoomService';
import QuestionService from '../../services/QuestionService';
import { Container, QuestionBoard, Header, SideInfos, Blocker } from './styles';
import { Question } from '../../components/Question';
import { ResultModal } from './ResultModal';
import { InfosContext } from '../../contexts/InfosContext';
import { StyledToastContainer } from '../../components/StyledToastContainer';
import { WaitingModal } from './WaitingModal';

export const Room = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [questions, setQuestions] = useState([] as any);
  const [gameroom, setGameroom] = useState(null || ({} as any));

  const [hasStarted, setHasStarted] = useState(false);
  const [isUserWaiting, setIsUserWaiting] = useState(false);
  const [shallShowResults, setShallShowResults] = useState(false);

  const [peopleAmount, setPeopleAmount] = useState(0);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [incorrectAnswersAmount, setIncorrectAnswersAmount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [counter, setCounter] = useState(60);

  const { roomId } = useParams();

  const navigate = useNavigate();
  const { socket, setAllRooms, participant } = useContext(InfosContext);

  const result = useAnimation();
  const correct = useAnimation();
  const incorrect = useAnimation();

  useEffect(() => {
    socket.on('person_entered_in_room', (data: any) => {
      // if the gameroom of the person who entered is equal to the gameroom of the user that received this event
      // because the user need to see only the users who entered in his room
      if (data?.room?.gamerooms[0]?.id === gameroom.id) {
        setPeopleAmount(data?.participantsAmount);
        toast(`${data.username} entered the room`, {
          autoClose: 1000,
          position: 'bottom-left',
        });
      }
    });

    socket.on('participant_left_this_room', (data: any) => {
      if (data?.room?.gamerooms[0]?.id === gameroom.id) {
        setPeopleAmount(data.participantsAmount);
      }
    });

    socket.on('quiz_started', (payload: any) => {
      if (payload.gameroomId === gameroom?.id && !hasStarted) {
        handleStartQuiz();
      }
      if (payload.gameroomId === gameroom?.id) {
        // setHasStarted(true);
        setCounter(payload.counter);
      }
    });

    // socket.on('quiz_ended', (payload: any) => {});
  }, [socket, gameroom]);

  useEffect(() => {
    const username = localStorage.getItem('username') as any;
    (async () => {
      try {
        const questionsOfRoom = await RoomService.listQuestions(Number(roomId));
        setQuestions(questionsOfRoom);

        // If there is a gameroom already opened with this roomId we get it
        const gameroomOfRoom = await RoomService.getGameroomOfRoom({
          roomId: Number(roomId),
        });

        if (gameroomOfRoom) {
          setGameroom(gameroomOfRoom);
        } else {
          console.log('gameroom-participant', participant?.gameroom);
          setGameroom(participant?.gameroom);
        }

        console.log(
          'ParticipantGameroom: ',
          participant?.gameroom,
          'Gameroom: ',
          gameroomOfRoom
        );

        if (!participant?.gameroom && !gameroomOfRoom) {
          handleExitRoom();
        }

        // Create participant in case the page is reload
        await RoomService.createParticipant({
          username: username,
          gameroomId: gameroomOfRoom?.id,
        });

        setPeopleAmount(gameroomOfRoom?.participants?.length);
      } catch (error: any) {
        console.log(error.response.data);
      }
    })();
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setShallShowResults(true);
      setIsResultModalOpen(true);
      setIsUserWaiting(false);
    }
  }, [counter]);

  useEffect(() => {
    (async () => {
      if (participant.id) {
        const { participantCreated } = await QuestionService.updateParticipant({
          participantId: participant.id,
          correctAnswers: correctAnswersAmount,
          incorrectAnswers: incorrectAnswersAmount,
          secondsRest: counter,
        });
      }
    })();
  }, [correctAnswersAmount, incorrectAnswersAmount, participant]);

  function handleStartQuiz() {
    setHasStarted(true);
  }

  function handlePassToNextQuestion() {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion((prevCurrent) => (prevCurrent += 1));
    } else if (counter !== 0 && currentQuestion === questions?.length - 1) {
      // End of the quiz
      setIsUserWaiting(true);
    }
  }

  function handleRestartQuiz() {
    setCorrectAnswersAmount(0);
    setIncorrectAnswersAmount(0);
    setCurrentQuestion(0);
    setIsResultModalOpen(false);
  }

  function handleExitRoom() {
    const username = localStorage.getItem('username') as any;

    if (gameroom.id) {
      // Here I am taking out the participant that left the room in frontend
      // because I am emitting the socket event that delete the participant in server
      // and in the same time grabbing the allRooms informations in interface when I go to Rooms,
      // so probably this time it's not enough to get updated infos

      setAllRooms((allRooms: any) => {
        return allRooms.map((room: any) => {
          const roomGameroom = room.gamerooms[0];

          if (roomGameroom?.id === gameroom?.id) {
            const participants = roomGameroom?.participants?.filter(
              (part: any) => part.username !== username
            );

            return {
              ...room,
              gamerooms: [{ ...roomGameroom, participants }],
            };
          }
          return room;
        });
      });

      socket.emit('participant_left_room', {
        username,
        gameroomId: gameroom?.id,
      });
    }
    navigate('/');
    location.reload();
  }

  // useEffect(() => {
  //   window.addEventListener('beforeunload', handleExitRoom);

  //   // return () => {
  //   //   window.removeEventListener('beforeunload', handleExitRoom);
  //   // };
  // }, [gameroom]);

  if (questions.length < 0) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <WaitingModal isWaiting={isUserWaiting} />
      <Blocker hasStarted={hasStarted}>
        <p>The game will start only when the room is full</p>
        <button onClick={() => handleExitRoom()}>Exit Room</button>
      </Blocker>
      <Container hasStarted={hasStarted}>
        <StyledToastContainer
          autoClose={2000}
          pauseOnHover={false}
          draggable
          closeOnClick={false}
          position="top-center"
          enableMultiContainer={false}
        />
        <QuestionBoard>
          <Header>
            <SideInfos>
              <p className="people-progress">{peopleAmount || '5'}/5</p>
            </SideInfos>
            <motion.div
              className="result-board"
              animate={result}
              initial={{ y: -100, opacity: 0 }}
            >
              <motion.div className="result" animate={correct}>
                <p>Correct</p> <p>{correctAnswersAmount}</p>
              </motion.div>
              <motion.div className="result" animate={incorrect}>
                <p>Incorrect</p> <p>{incorrectAnswersAmount}</p>
              </motion.div>
              <div className="home-button" onClick={() => handleExitRoom()}>
                Home
              </div>
            </motion.div>
            <SideInfos>
              <p className="timer">{counter}</p>
            </SideInfos>
          </Header>
          <Question
            content={questions[currentQuestion]?.content}
            alternatives={questions[currentQuestion]?.alternatives}
            correctAnswer={questions[currentQuestion]?.correct_answer}
            handlePassToNextQuestion={handlePassToNextQuestion}
            setCorrectAnswersAmount={setCorrectAnswersAmount}
            setIncorrectAnswersAmount={setIncorrectAnswersAmount}
            controls={{ result, correct, incorrect } as any}
          />
        </QuestionBoard>
        <ResultModal
          isModalOpen={isResultModalOpen}
          setIsModalOpen={setIsResultModalOpen}
          correctAnswersAmount={correctAnswersAmount}
          incorrectAnswersAmount={incorrectAnswersAmount}
          handleRestartQuiz={handleRestartQuiz}
          handleExitRoom={handleExitRoom}
          gameroomId={gameroom?.id}
          shallShowResults={shallShowResults}
        />
      </Container>
    </>
  );
};
