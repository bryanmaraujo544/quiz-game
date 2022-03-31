import { useContext, useEffect, useRef, useState } from 'react';
import { Container, QuestionBoard, Header, SideInfos } from './styles';
import { Question } from '../../components/Question';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ResultModal } from './ResultModal';
import { InfosContext } from '../../contexts/InfosContext';
import RoomService from '../../services/RoomService';
import { toast } from 'react-toastify';

export const Room = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [questions, setQuestions] = useState([] as any);
  const [gameroom, setGameroom] = useState(null || ({} as any));
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [incorrectAnswersAmount, setIncorrectAnswersAmount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [peopleAmount, setPeopleAmount] = useState(0);
  const [counter, setCounter] = useState(10);

  const { roomId } = useParams();
  const { socket } = useContext(InfosContext);
  const intervalRef = useRef(0);
  const navigate = useNavigate();

  const result = useAnimation();
  const correct = useAnimation();
  const incorrect = useAnimation();

  useEffect(() => {
    socket.on('person_entered_in_room', (data: any) => {
      console.log('PERSON ENTERED IN ROOM');
      console.log(data.participantsAmount);
      setPeopleAmount(data.participantsAmount);
    });

    socket.on(
      'participant_left_this_room',
      (data: {
        username: string;
        gameroomId: string;
        participantsAmount: number;
      }) => {
        setPeopleAmount(data.participantsAmount);
        // console.log(`THE ${data.username} LEFT THE ROOM`);
        toast(`${data.username} left the room`, {
          autoClose: 1000,
          position: 'bottom-left',
        });
      }
    );
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
        setGameroom(gameroom);
        setPeopleAmount(gameroom.participants.length);
        // }
      } catch (error: any) {
        console.log(error.response.data);
      }

      // handleStartQuiz();
    })();
  }, []);

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalRef.current);
      setIsResultModalOpen(true);
    }
  }, [counter]);

  useEffect(() => {
    const username = localStorage.getItem('username') as any;

    return () => {
      if (gameroom?.id) {
        socket.emit('participant_left_room', {
          username,
          gameroomId: gameroom?.id,
        });
      }
    };
  }, [gameroom]);

  function handleStartQuiz() {
    const interval = setInterval(() => {
      console.log('interval runnign');
      setCounter((prev) => {
        if (prev > 0) {
          return (prev -= 1);
        }
        return prev;
      });
    }, 1000);
    intervalRef.current = interval;
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

  if (questions.length < 0) {
    return <h1>loading</h1>;
  }

  return (
    <Container>
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
            <div className="home-button" onClick={() => navigate('/')}>
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
  );
};
