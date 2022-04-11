import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return <h1>Not found</h1>;
};
