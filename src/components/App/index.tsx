import { Container } from './styles';
import GlobalStyles from '../../styles/global';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StyledToastContainer } from '../StyledToastContainer';
import 'react-toastify/dist/ReactToastify.css';

import { Rooms } from '../../pages/Rooms';
import { Room } from '../../pages/Room';
import { Login } from '../../pages/Login';
import { InfosContextProvider } from '../../contexts/InfosContext';
import { NotFound } from '../NotFound';
import { Admin } from '../../pages/Admin';
import { AddRoom } from '../../pages/Admin/AddRoom';

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledToastContainer
        autoClose={2000}
        pauseOnHover={false}
        draggable
        closeOnClick={false}
        position="top-center"
        enableMultiContainer={false}
        hideProgressBar
      />
      <Container>
        <InfosContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Rooms />} />
              <Route path="/login/:roomId" element={<Login />} />
              <Route path="/room/:roomId" element={<Room />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/add-room" element={<AddRoom />} />
            </Routes>
          </BrowserRouter>
        </InfosContextProvider>
      </Container>
    </>
  );
}

export default App;
