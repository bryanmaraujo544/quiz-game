import { useEffect, useState } from 'react';
import { Login } from './Login';
import { Container } from './styles';

export const Admin = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  useEffect(() => {}, []);
  console.log('admin');
  return (
    <Container>
      {isAllowed ? (
        <div className="container">
          <h1>Admin</h1>
        </div>
      ) : (
        <Login setIsAllowed={setIsAllowed} />
      )}
    </Container>
  );
};
