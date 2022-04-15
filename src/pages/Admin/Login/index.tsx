import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container } from './styles';

interface Props {
  setIsAllowed: any;
}

export const Login = ({ setIsAllowed }: Props) => {
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      setIsAllowed(true);
    }
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!secretKey) {
      return toast.error('Type something!');
    }

    const str = 'ayniarthsilgne';
    if (secretKey === str.split('').reverse().join('')) {
      setIsAllowed(true);
      localStorage.setItem('isAdmin', JSON.stringify(true));
    } else {
      return toast.error('Secret key is wrong :(');
    }
  }

  return (
    <Container>
      <form>
        <input
          placeholder="Enter the secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          type="password"
        />
        <button onClick={handleSubmit}>Access</button>
      </form>
    </Container>
  );
};
