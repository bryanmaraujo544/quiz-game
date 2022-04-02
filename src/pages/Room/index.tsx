import { useContext, useEffect, useRef, useState } from 'react';
import { Container, QuestionBoard, Header, SideInfos, Blocker } from './styles';
import { Question } from '../../components/Question';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ResultModal } from './ResultModal';
import { InfosContext } from '../../contexts/InfosContext';
import RoomService from '../../services/RoomService';
import { toast } from 'react-toastify';
import { StyledToastContainer } from '../../components/StyledToastContainer';

export const Room = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [questions, setQuestions] = useState([] as any);
  const [gameroom, setGameroom] = useState(null || ({} as any));
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [incorrectAnswersAmount, setIncorrectAnswersAmount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [hasStarted, setHasStarted] = useState(false);
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [counter, setCounter] = useState(120);

  const { roomId } = useParams();
  const navigate = useNavigate();
  const { socket, setAllRooms } = useContext(InfosContext);
  // const intervalRef = useRef(0);

  const result = useAnimation();
  const correct = useAnimation();
  const incorrect = useAnimation();

  useEffect(() => {
    socket.on('person_entered_in_room', (data: any) => {
      console.log('PERSON ENTERED IN ROOM');
      setPeopleAmount(data.participantsAmount);
      toast(`${data.username} entered the room`, {
        autoClose: 1000,
        position: 'bottom-left',
      });
    });

    socket.on(
      'participant_left_this_room',
      (data: {
        username: string;
        gameroomId: string;
        participantsAmount: number;
      }) => {
        setPeopleAmount(data.participantsAmount);
      }
    );

    socket.on('quiz_started', (payload: any) => {
      console.log('counter', payload.counter);
      // setCounter(payload.counter);
      handleStartQuiz();
    });

    socket.on('quiz_ended', (payload: any) => {
      console.log('TERMINOOOOU', payload);
      setIsResultModalOpen(true);
    });
  }, [socket]);

  useEffect(() => {
    const username = localStorage.getItem('username') as any;
    (async () => {
      try {
        const questionsOfRoom = await RoomService.listQuestions(Number(roomId));
        setQuestions(questionsOfRoom);

        // If there is a gameroom already opened with this roomId we get it
        const gameroom = await RoomService.getGameroomOfRoom({
          roomId: Number(roomId),
        });

        // Create participant in case the page is reload
        await RoomService.createParticipant({
          username: username,
          gameroomId: gameroom.id,
        });

        setGameroom(gameroom);
        setPeopleAmount(gameroom.participants.length);
      } catch (error: any) {
        console.log(error.response.data);
      }

      // handleStartQuiz();
    })();
  }, []);

  // useEffect(() => {
  //   if (counter === 0) {
  //     setIsResultModalOpen(true);
  //   }
  // }, [counter]);

  // The purpose of this useEffect is emit and event to socket io when the room page is unmounted
  // in other words, when the user gets out of the room
  useEffect(() => {
    const username = localStorage.getItem('username') as any;

    return () => {
      if (gameroom?.id) {
        // Here I am taking out the participant that left the room in frontend to
        // because I am emitting the socket event that delete the participant in server
        // and in the same time grabbing the allRooms informations when I go to Rooms
        // and probably the this time it's not enough to get update infos
        setAllRooms((allRooms: any) => {
          return allRooms.map((gameroom2: any) => {
            if (gameroom2.id === gameroom.id) {
              const participants = gameroom2.participants.filter(
                (part: any) => part.username !== username
              );

              return { ...gameroom2, participants };
            }
          });
        });
        socket.emit('participant_left_room', {
          username,
          gameroomId: gameroom?.id,
        });
      }
    };
  }, [gameroom]);

  function handleStartQuiz() {
    setHasStarted(true);
  }

  function handlePassToNextQuestion() {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion((prevCurrent) => (prevCurrent += 1));
    } else {
      // End of the quiz
      setIsResultModalOpen(true);
    }
  }

  function handleRestartQuiz() {
    setCorrectAnswersAmount(0);
    setIncorrectAnswersAmount(0);
    setCurrentQuestion(0);
    setIsResultModalOpen(false);
  }

  function handleExitRoom() {
    navigate('/');
  }

  if (questions.length < 0) {
    return <h1>loading</h1>;
  }

  return (
    <>
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
              <p className="people-progress">{peopleAmount}/10</p>
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
        />
      </Container>
    </>
  );
};
