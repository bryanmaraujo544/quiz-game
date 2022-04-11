import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

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
        return toast.error('Type something', { position: 'top-center' });
      }
      const data: any = await LoginService.checkUsername(newUsername);
      if (!data?.isAuthorized) {
        return toast.error('This name is already been used :(', {
          position: 'top-center',
        });
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
              <button type="submit">
                <AiOutlineCheckCircle className="check-icon" />
              </button>
            </form>
          ) : (
            <>
              <p className="username">{usernameInStorage}</p>
              <FiEdit2 className="edit-icon" onClick={handleEditUsername} />
            </>
          )}
        </div>
      )}
    </Container>
  );
};
