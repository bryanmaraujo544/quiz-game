import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminService from '../../../services/AdminService';
import { Container, Form, Input, Button } from './styles';

export const AddRoom = () => {
  const [roomTitle, setRoomTitle] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const [hasClicked, setHasClicked] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    setHasClicked(true);
    e.preventDefault();

    if (!roomTitle || !photoURL) {
      toast.error('All fields are necessary');
      setHasClicked(false);
      return;
    }

    if (roomTitle.length > 24) {
      toast.error('Room Title is too long');
      setHasClicked(false);
      return;
    }

    if (photoURL.length > 512) {
      toast.error('Photo URL is too long');
      setHasClicked(false);
      return;
    }

    const createRoomPromise = AdminService.createRoom({ roomTitle, photoURL });
    toast.promise(createRoomPromise, {
      pending: 'Creating Room',
      success: 'Room Created',
      error: 'Error!',
    });

    await createRoomPromise;

    navigate('/admin');
    location.reload();
  }

  return (
    <Container>
      <header>
        <h1>Create a New Room</h1>
        <Button>Admin Page</Button>
      </header>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Room Title"
          value={roomTitle}
          onChange={(e) => setRoomTitle(e.target.value)}
          autoFocus
        />
        <Input
          placeholder="Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <Button>Add Room</Button>
      </Form>
    </Container>
  );
};
