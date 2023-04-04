import { forwardRef } from 'react';
import clsx from 'clsx';

import FormField from '~/components/FormField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from '~/store/toast';
import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';
import { authActions } from '~/redux/slices/authSlice';
import { useCreatePostMutation } from '~/types/generated';
import { stepCalcForm } from '~/helpers/formSchemas';
// images
import { SpinnerRing } from '~/components/Spinner';

type WalkCalculateMenuFromType = { steps: number };

const WalkCalculateMenu = forwardRef<any, any>((_props, forwardRef) => {
  const dispatch = useStoreDispatch();
  const [createPost, { loading: loadingCreatePost }] = useCreatePostMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WalkCalculateMenuFromType>({
    resolver: yupResolver(stepCalcForm),
  });

  const handleCreatePostSubmit = async ({ steps }: WalkCalculateMenuFromType) => {
    const averageHumanStepInSm = 71;
    const km = (steps * averageHumanStepInSm * 0.00001).toFixed(2);
    console.log(km, 'km');
    const canvas = document.createElement('canvas');
    canvas.width = 494;
    canvas.height = 371;
    const canvasContext = canvas.getContext('2d')!;
    const image = document.createElement('img');
    image.src = 'shoes.jpg';
    image.onload = async () => {
      canvasContext.font = '30px Verdana';
      canvasContext.textBaseline = 'middle';
      canvasContext.textAlign = 'center';
      canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvasContext.fillStyle = '#fff';
      canvasContext.fillText('Your progress:', canvas.width / 2, canvas.height / 2);
      canvasContext.fillText(`${km} kilometers`, canvas.width / 2, canvas.height / 2 + 33);
      const base64Photo = canvas.toDataURL('image/jpeg', 0.5);
      console.log(base64Photo);
      const response = await createPost({
        variables: {
          createPostInput: {
            caption: 'My current progress!',
            base64Photo,
          },
        },
      });

      const data = response.data?.createPost;

      if (!data?.success) return;

      toast({ messageType: 'sharePostSuccess', status: 'success' });

      dispatch(postActions.addNewPost(data.post!));
      dispatch(authActions.increasePostCount());
    };
  };

  return (
    <div
      ref={forwardRef}
      className={clsx(
        'absolute top-[calc(100%+10px)] -right-4',
        'rounded-md shadow-[0_1px_5px_1px_rgba(0,0,0,0.0975)] w-52 text-sm',
        'bg-white',
        'p-3',
      )}
    >
      <FormField register={register('steps')} placeholder='Steps' errors={errors} />

      <button
        type='submit'
        className={clsx(
          'btn text-sm w-full gap-x-2 h-auth-btn-h mt-2',
          'text-white bg-primary',
          loadingCreatePost && 'btn--disabled btn--pending',
        )}
        onClick={handleSubmit(handleCreatePostSubmit)}
        disabled={loadingCreatePost}
      >
        {loadingCreatePost ? <SpinnerRing className='text-white' /> : 'submit'}
      </button>
    </div>
  );
});

WalkCalculateMenu.displayName = 'WalkCalculateMenu';

export default WalkCalculateMenu;
