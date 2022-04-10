import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from 'react-loading';

import { InfosContext } from '../../contexts/InfosContext';
import LoginService from '../../services/LoginService';
import { Container, Form, Input, Button } from './styles';
import RoomService from '../../services/RoomService';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setUser, socket, setParticipant } = useContext(InfosContext);

  const { roomId } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!username) {
        return window.alert('please, type something');
      }

      const data: any = await LoginService.checkUsername(username);
      if (!data.isAuthorized) {
        return window.alert('This user name already is in use');
      }

      localStorage.setItem('username', username);
      setUser({ username });

      const gameroom = await RoomService.getGameroomOfRoom({
        roomId: Number(roomId),
      });

      if (!gameroom) {
        // When some user enter in the room and he is the first to enter, any gameroom is opened
        // with that room, so the first user is "responsible" to create the gameroom
        const { gameroomCreated } = await RoomService.createGameroom({
          roomId: Number(roomId),
        });

        const { participantCreated, message } =
          await RoomService.createParticipant({
            username: username,
            gameroomId: gameroomCreated.id,
          });

        if (!participantCreated) {
          window.alert(message);
        }

        if (participantCreated) {
          setParticipant(participantCreated);
          socket.emit('join_room', {
            gameroomId: gameroomCreated.id,
            roomId: roomId,
            username: username,
          });
          setIsLoading(false);
          navigate(`/room/${roomId}`);
        }
      } else {
        // If there is some gameroom opened with that room we add the user as participant of that
        const { participantCreated, message } =
          await RoomService.createParticipant({
            username: username,
            gameroomId: gameroom.id,
          });

        if (!participantCreated) {
          window.alert(message);
        }
        if (participantCreated) {
          setParticipant(participantCreated);
          socket.emit('join_room', {
            gameroomId: gameroom.id,
            roomId: roomId,
            username: username,
          });
          setIsLoading(false);
          navigate(`/room/${roomId}`);
        }
      }
    } catch (error: any) {
      return window.alert(error.response.data.message);
    }
  }

  return (
    <Container>
      <h1>Choose one username</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <Loading type="spinningBubbles" height="3.2rem" width="3.2rem" />
          ) : (
            'Join Room'
          )}
        </Button>
      </Form>
    </Container>
  );
};
