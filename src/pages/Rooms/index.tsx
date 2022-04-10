import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from 'react-loading';

import { InfosContext } from '../../contexts/InfosContext';
import RoomService from '../../services/RoomService';
import RoomsService from '../../services/RoomsService';
import { Container, Room } from './styles';

interface Room {
  id: number;
  title: string;
  photo_url: string;
}

interface Participant {
  id: number;
  username: string;
}

interface Gameroom {
  id: number;
  room: Room;
  participants: Participant[];
}

export const Rooms = () => {
  const [roomClicked, setRoomClicked] = useState(null);
  const [isRoomsLoading, setIsRoomsLoading] = useState(true);

  const { socket, allRooms, setAllRooms, setParticipant } =
    useContext(InfosContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('person_entered_in_room', (data: any) => {
      console.log('entered', data);
      setAllRooms((allRooms: any) => {
        return allRooms.map((room: any) => {
          const roomGameroom = room?.gamerooms[0];
          console.log('roomGameroom', roomGameroom);

          if (room.id === data?.room?.id) {
            return data.room;
          }

          return room;
        });
      });
    });

    socket.on('participant_left_this_room', (data: any) => {
      setAllRooms((allRooms: any) => {
        return allRooms.map((room: any) => {
          if (room?.id === data?.room?.id) {
            return data.room;
          }

          return room;
        });
      });
    });
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        if (allRooms.length === 0) {
          const { data: rooms } = await RoomsService.listAllRooms();
          setIsRoomsLoading(false);
          setAllRooms(rooms);
        }
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  async function handleEnterRoom(room: any) {
    const usernameInStorage = localStorage.getItem('username');
    setRoomClicked(room.id);
    try {
      if (usernameInStorage) {
        const roomGameroom = await RoomService.getGameroomOfRoom({
          roomId: Number(room.id),
        });

        if (!roomGameroom) {
          // When some user enter in the room and he is the first to enter, any roomGameroom is opened
          // with that room, so the first user is "responsible" to create the roomGameroom
          const { gameroomCreated } = await RoomService.createGameroom({
            roomId: Number(room.id),
          });

          const { participantCreated, message } =
            await RoomService.createParticipant({
              username: usernameInStorage,
              gameroomId: gameroomCreated.id,
            });
          setParticipant(participantCreated);

          if (!participantCreated) {
            window.alert(message);
          } else {
            socket.emit('join_room', {
              gameroomId: roomGameroom.id,
              roomId: room.id,
              username: usernameInStorage,
            });
            navigate(`room/${room.id}`);
          }
          return;
        }

        // If there is some roomGameroom opened with that room we add the user as participant of that
        const { participantCreated, message } =
          await RoomService.createParticipant({
            username: usernameInStorage,
            gameroomId: roomGameroom.id,
          });
        setParticipant(participantCreated);

        if (participantCreated === null) {
          window.alert(message);
        } else {
          socket.emit('join_room', {
            gameroomId: roomGameroom.id,
            roomId: room.id,
            username: usernameInStorage,
          });
          navigate(`room/${room.id}`);
        }
      } else {
        navigate(`login/${room.id}`);
      }
    } catch {
      // console.log('The participant already ')
    }
  }

  return (
    <Container>
      <h1>Rooms</h1>
      <div className="rooms">
        {isRoomsLoading ? (
          <Loading type="spinningBubbles" height="12.8rem" width="12.8rem" />
        ) : (
          allRooms.map(
            ({ id, title, photo_url, gamerooms }: any, i: number) => (
              <Room
                className="room"
                isFull={gamerooms[0]?.has_started === true}
                key={`rooms-${id}`}
              >
                <p className="room-title">{title}</p>
                <div className="img-container">
                  <img src={photo_url} alt="" />
                  <p className="people-amount">
                    {gamerooms[0]?.participants?.length || 0}/<strong>5</strong>
                  </p>
                </div>
                <button
                  onClick={() => handleEnterRoom({ id })}
                  disabled={roomClicked !== null}
                >
                  {/* Enter */}
                  {roomClicked === id ? (
                    <Loading
                      className="loading"
                      type="spinningBubbles"
                      height="3.2rem"
                      width="3.2rem"
                    />
                  ) : (
                    'Enter'
                  )}
                </button>
              </Room>
            )
          )
        )}
      </div>
    </Container>
  );
};
