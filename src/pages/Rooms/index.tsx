import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  // const [allRooms, setAllRooms] = useState([] as Gameroom[]);
  const { socket, allRooms, setAllRooms } = useContext(InfosContext);
  console.log({ allRooms });

  useEffect(() => {
    socket.on('person_entered_in_room', (data: any) => {
      console.log('person entered in room <Rooms/>', data);
      setAllRooms((allRooms: any) => {
        return allRooms.map((room: any) => {
          const gameroom = room?.gamerooms[0];
          console.log('gameroom when entered', gameroom);

          if (gameroom?.id === data?.room?.gamerooms[0]?.id) {
            return data.room;
          } else if (!gameroom) {
            return data.room;
          }
          return room;
        });
      });
    });

    socket.on('participant_left_this_room', (data: any) => {
      setAllRooms((allRooms: any) => {
        return allRooms.map((room: any) => {
          if (room.gamerooms[0].id === data.room.gamerooms[0].id) {
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
          setAllRooms(rooms);
          console.log({ rooms });
        }
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  async function handleEnterRoom(room: any) {
    const usernameInStorage = localStorage.getItem('username');
    try {
      if (usernameInStorage) {
        const gameroom = await RoomService.getGameroomOfRoom({
          roomId: Number(room.id),
        });
        console.log('Is there a gameroom?', gameroom);

        if (!gameroom) {
          console.log('there is no gameroom');
          // When some user enter in the room and he is the first to enter, any gameroom is opened
          // with that room, so the first user is "responsible" to create the gameroom
          const { gameroomCreated } = await RoomService.createGameroom({
            roomId: Number(room.id),
          });
          console.log('gameroom created when there is no one', gameroomCreated);

          const { participantCreated, message } =
            await RoomService.createParticipant({
              username: usernameInStorage,
              gameroomId: gameroomCreated.id,
            });

          if (!participantCreated) {
            // console.log('participant it was not created')
            window.alert(message);
          } else {
            console.log('participant it was created. ready to enter the room');
            socket.emit('join_room', {
              roomId: room.id,
              username: usernameInStorage,
            });
            navigate(`room/${room.id}`);
          }
          return;
        }

        // If there is some gameroom opened with that room we add the user as participant of that
        const { participantCreated, message } =
          await RoomService.createParticipant({
            username: usernameInStorage,
            gameroomId: gameroom.id,
          });

        if (participantCreated === null) {
          window.alert(message);
        } else {
          socket.emit('join_room', {
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
        {allRooms.map(({ id, title, photo_url, gamerooms }: any, i: number) => (
          <Room className="room" isFull={i === 5} key={id}>
            <p className="room-title">{title}</p>
            <div className="img-container">
              <img src={photo_url} alt="" />
              <p className="people-amount">
                {gamerooms[0]?.participants?.length || 0}/<strong>10</strong>
              </p>
            </div>
            <button onClick={() => handleEnterRoom({ id })} disabled={i === 5}>
              Entrar
            </button>
          </Room>
        ))}
      </div>
    </Container>
  );
};
