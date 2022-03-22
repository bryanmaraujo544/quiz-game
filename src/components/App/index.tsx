import { Container } from './styles';
import GlobalStyles from '../../styles/global';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Rooms } from '../../pages/Rooms';
import { Room } from '../../pages/Room';

function App() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Rooms />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
