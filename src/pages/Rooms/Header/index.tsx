import { useState } from 'react';
import { toast } from 'react-toastify';
import LoginService from '../../../services/LoginService';
import { Container } from './styles';

export const Header = () => {
  const [isToEdit, setIsToEdit] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const usernameInStorage = localStorage.getItem('username');

  function handleEditUsername() {
    setIsToEdit(true);
    setNewUsername(usernameInStorage || '');
  }

  async function handleUpdateUsername(e: any) {
    e.preventDefault();

    try {
      if (!newUsername) {
        console.log('type something');
        return toast.error('Type something');
      }
      const data: any = await LoginService.checkUsername(newUsername);
      if (!data?.isAuthorized) {
        return toast.error('This name is already been used :(');
      }

      localStorage.setItem('username', newUsername);
      setIsToEdit(false);
    } catch (err: any) {
      toast.error(err?.response.data.message);
    }
  }

  return (
    <Container>
      <h1>Rooms</h1>
      {usernameInStorage && (
        <div className="username-div">
          {isToEdit ? (
            <form onSubmit={handleUpdateUsername} className="form">
              <input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="input-username"
                autoFocus
              />
            </form>
          ) : (
            <p onClick={handleEditUsername} className="username">
              {usernameInStorage}
            </p>
          )}
        </div>
      )}
    </Container>
  );
};
