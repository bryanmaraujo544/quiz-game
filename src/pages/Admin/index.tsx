import { useEffect, useState } from 'react';
import RoomsService from '../../services/RoomsService';
import { Login } from './Login';
import { Container, Rooms, RoomCard, AddQuestion, Input } from './styles';

export const Admin = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [rooms, setRooms] = useState([] as any);
  console.log({ rooms });
  useEffect(() => {
    (async () => {
      try {
        const { data } = await RoomsService.listAllRooms();
        setRooms(data);
      } catch {
        console.log('err in admin');
      }
    })();
  }, []);
  console.log('admin');
  return (
    <Container>
      {isAllowed ? (
        <Rooms>
          <h1>Admin</h1>
          <div className="rooms-cards">
            {rooms.map((room: any) => (
              <RoomCard>
                <p className="title">{room.title}</p>
                <div className="img-container">
                  <img src={room.photo_url} alt="room-thumb" />
                </div>
                <button type="button">Add questions</button>
              </RoomCard>
            ))}
          </div>
          <AddQuestion>
            <Input placeholder="Question Content" />
            <Input placeholder="Correct Answer" />
            <div className="alternatives">
              <Input placeholder="Alternative 1" />
              <Input placeholder="Alternative 2" />
              <Input placeholder="Alternative 3" />
              <Input placeholder="Alternative 4" />
            </div>
            <button type="submit" className="add-btn">
              Add question
            </button>
          </AddQuestion>
        </Rooms>
      ) : (
        <Login setIsAllowed={setIsAllowed} />
      )}
    </Container>
  );
};
