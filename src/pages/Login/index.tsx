import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InfosContext } from '../../contexts/InfosContext';
import { Container, Form, Input, Button } from './styles';

export const Login = () => {
  const [username, setUsername] = useState('');
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { setUser } = useContext(InfosContext);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!username) {
      window.alert('please, type something');
      return;
    }

    localStorage.setItem('username', username);
    setUser({ username, id: Math.random() });
    navigate(`/room/${roomId}`);
  }
  console.log({ roomId });
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
