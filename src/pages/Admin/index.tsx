import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import RoomsService from '../../services/RoomsService';
import { Login } from './Login';
import {
  Container,
  Rooms,
  RoomCard,
  AddQuestion,
  InputGroup,
  Input,
} from './styles';

interface QuestionForm {
  questionContent: string;
  correctAnswer: string;
  alternative1: string;
  alternative2: string;
  alternative3: string;
  alternative4: string;
}

export const Admin = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [rooms, setRooms] = useState([] as any);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionForm>();

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

  const onSubmit: SubmitHandler<QuestionForm> = (data) => {};

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
          <AddQuestion onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <Input
                placeholder="Question Content"
                {...register('questionContent', {
                  required: true,
                  maxLength: 48,
                })}
              />
              <div className="error">
                {errors.questionContent?.type === 'required'
                  ? 'This field is required'
                  : 'The string is too long.'}
              </div>
            </InputGroup>
            <InputGroup>
              <Input
                placeholder="Correct Answer"
                {...register('correctAnswer', {
                  required: true,
                  maxLength: 24,
                })}
              />
              <div className="error">
                {errors.correctAnswer?.type === 'required'
                  ? 'This field is required'
                  : 'The string is too long.'}
              </div>
            </InputGroup>
            <div className="alternatives">
              <InputGroup>
                <Input
                  placeholder="Alternative 1"
                  {...register('alternative1', {
                    required: true,
                    maxLength: 24,
                  })}
                />
                <div className="error">
                  {errors.questionContent?.type === 'required'
                    ? 'This field is required'
                    : 'The string is too long.'}
                </div>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Alternative 2"
                  {...register('alternative2', {
                    required: true,
                    maxLength: 24,
                  })}
                />
                <div className="error">
                  {errors.questionContent?.type === 'required'
                    ? 'This field is required'
                    : 'The string is too long.'}
                </div>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Alternative 3"
                  {...register('alternative3', {
                    required: true,
                    maxLength: 24,
                  })}
                />
                <div className="error">
                  {errors.questionContent?.type === 'required'
                    ? 'This field is required'
                    : 'The string is too long.'}
                </div>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Alternative 4"
                  {...register('alternative4', {
                    required: true,
                    maxLength: 24,
                  })}
                />
                <div className="error">
                  {errors.questionContent?.type === 'required'
                    ? 'This field is required'
                    : 'The string is too long.'}
                </div>
              </InputGroup>
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
