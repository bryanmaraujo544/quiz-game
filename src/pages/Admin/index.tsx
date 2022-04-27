import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from 'react-loading';

import AdminService from '../../services/AdminService';
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
  const [questionRoomId, setQuestionRoomId] = useState<number | null>(null);
  const [addQuestionHasClicked, setAddQuestionHasClicked] = useState(false);
  const [roomsIsLoading, setRoomsIsLoading] = useState(true);

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
        setRoomsIsLoading(false);
      } catch {
        console.log('err in admin');
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<QuestionForm> = async ({
    questionContent,
    correctAnswer,
    alternative1,
    alternative2,
    alternative3,
    alternative4,
  }) => {
    console.log('submit');
    try {
      setAddQuestionHasClicked(true);

      const alternatives = [
        alternative1,
        alternative2,
        alternative3,
        alternative4,
      ];

      if (questionRoomId === null) {
        toast.error('Select some room to add the question');
        setAddQuestionHasClicked(false);
        return;
      }

      if (!alternatives.includes(correctAnswer)) {
        toast.error('There are no correct answer in alternatives', {
          autoClose: 3000,
        });
        setAddQuestionHasClicked(false);
        return;
      }

      const { questionCreated }: any = await AdminService.createQuestion({
        roomId: questionRoomId,
        correctAnswer,
        questionContent,
      });

      const alternativesPromise = new Promise((resolve, reject) => {
        alternatives.forEach((alternative, i) => {
          (async () => {
            await AdminService.createAlternative({
              alternativeContent: alternative,
              questionId: questionCreated.id,
            });
            if (i === 3) {
              resolve('Solved');
            }
          })();
        });
      });
      toast.promise(alternativesPromise, {
        pending: 'Creating Question...',
        success: 'Question Created',
        error: 'Some Error Happened',
      });
      await alternativesPromise;

      location.reload();
    } catch (err: any) {
      setAddQuestionHasClicked(false);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <Container>
      {isAllowed ? (
        <Rooms>
          <div className="rooms-cards">
            {roomsIsLoading ? (
              <Loading
                type="spinningBubbles"
                height="12.8rem"
                width="12.8rem"
                className="rooms-loading"
              />
            ) : (
              rooms.map((room: any) => (
                <RoomCard isSelected={questionRoomId === room.id}>
                  <p className="title">{room.title}</p>
                  <div className="img-container">
                    <img src={room.photo_url} alt="room-thumb" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuestionRoomId(room.id)}
                  >
                    Add Question
                  </button>
                </RoomCard>
              ))
            )}
            <div className="add-room"></div>
          </div>
          {questionRoomId !== null && (
            <AddQuestion onSubmit={handleSubmit(onSubmit)}>
              <InputGroup>
                <Input
                  placeholder="Question Content"
                  {...register('questionContent', {
                    required: true,
                    maxLength: 96,
                  })}
                />
                <div className="error">
                  {errors.questionContent
                    ? errors.questionContent?.type === 'required'
                      ? 'This field is required'
                      : 'The string is too long.'
                    : null}
                </div>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Correct Answer"
                  {...register('correctAnswer', {
                    required: true,
                    maxLength: 42,
                  })}
                />
                <div className="error">
                  {errors.correctAnswer
                    ? errors.correctAnswer?.type === 'required'
                      ? 'This field is required'
                      : 'The string is too long.'
                    : null}
                </div>
              </InputGroup>
              <div className="alternatives">
                <InputGroup>
                  <Input
                    placeholder="Alternative 1"
                    {...register('alternative1', {
                      required: true,
                      maxLength: 42,
                    })}
                  />
                  <div className="error">
                    {errors.alternative1
                      ? errors.alternative1?.type === 'required'
                        ? 'This field is required'
                        : 'The string is too long.'
                      : null}
                  </div>
                </InputGroup>
                <InputGroup>
                  <Input
                    placeholder="Alternative 2"
                    {...register('alternative2', {
                      required: true,
                      maxLength: 42,
                    })}
                  />
                  <div className="error">
                    {errors.alternative2
                      ? errors.alternative2?.type === 'required'
                        ? 'This field is required'
                        : 'The string is too long.'
                      : null}
                  </div>
                </InputGroup>
                <InputGroup>
                  <Input
                    placeholder="Alternative 3"
                    {...register('alternative3', {
                      required: true,
                      maxLength: 42,
                    })}
                  />
                  <div className="error">
                    {errors.alternative3
                      ? errors.alternative3?.type === 'required'
                        ? 'This field is required'
                        : 'The string is too long.'
                      : null}
                  </div>
                </InputGroup>
                <InputGroup>
                  <Input
                    placeholder="Alternative 4"
                    {...register('alternative4', {
                      required: true,
                      maxLength: 42,
                    })}
                  />
                  <div className="error">
                    {errors.alternative4
                      ? errors.alternative4?.type === 'required'
                        ? 'This field is required'
                        : 'The string is too long.'
                      : null}
                  </div>
                </InputGroup>
              </div>
              <button
                type="submit"
                className="add-btn"
                disabled={addQuestionHasClicked}
              >
                Add question
              </button>
            </AddQuestion>
          )}
        </Rooms>
      ) : (
        <Login setIsAllowed={setIsAllowed} />
      )}
    </Container>
  );
};
