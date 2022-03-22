import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

const rooms = [
  {
    id: 10,
    title: 'Football Questions',
    questions: [
      {
        content: 'Quem ganhou a copa de 2018?',
        alternatives: ['Brasil', 'Alemanha', 'Espanha', 'França'],
        correctAnswer: 'França',
      },
      {
        content: 'Quem ganhou a copa de 2010?',
        alternatives: ['Itálica', 'Argentina', 'Espanha', 'Gana'],
        correctAnswer: 'Espanha',
      },
      {
        content: 'Qual linguagem é a "evolução" do JavaScript',
        alternatives: ['Ruby', 'TypeScript', 'PHP', 'CoffeScript'],
        correctAnswer: 'TypeScript',
      },
    ],
  },
  {
    id: 20,
    title: 'Trap Questions',
    questions: [
      {
        content: 'Qual o nome do único album do Matuê?',
        alternatives: ['É Sal', 'Astroworld', 'Máquina do Tempo', '777-666'],
        correctAnswer: 'Máquina do Tempo',
      },
      {
        content: 'Qual destas músicas é do Kyan',
        alternatives: ['Oi, como cê tá', 'Trap de gringo', 'É sal', 'Anos-luz'],
        correctAnswer: 'Trap de gringo',
      },
    ],
  },
];

export const Rooms = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="room">
        {rooms.map((room) => (
          <div className="room">
            <p>{room.title}</p>
            <button onClick={() => navigate(`room/${room.id}`)}>Entrar</button>
          </div>
        ))}
      </div>
      <h1>Rooms</h1>
    </Container>
  );
};
