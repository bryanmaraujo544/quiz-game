import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InfosContext } from '../../contexts/InfosContext';
import LoginService from '../../services/LoginService';
import { Container, Form, Input, Button } from './styles';
import RoomService from '../../services/RoomService';

export const Login = () => {
  const [username, setUsername] = useState('');
  const { setUser, socket } = useContext(InfosContext);

  const { roomId } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      if (!username) {
        window.alert('please, type something');
        return;
      }

      const { data } = await LoginService.checkUsername(username);
      if (!data.isAuthorized) return;

      localStorage.setItem('username', username);
      setUser({ username });

      const gameroom = await RoomService.getGameroomOfRoom({
        roomId: Number(roomId),
      });

      const { participantCreated } = await RoomService.createParticipant({
        username,
        gameroomId: gameroom.id,
      });

      socket.emit('join_room', {
        roomId,
        username,
      });
      navigate(`/room/${roomId}`);
      console.log({ participantCreated });
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
        <Button>Join Room</Button>
      </Form>
    </Container>
  );
};
