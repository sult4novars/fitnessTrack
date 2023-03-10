import clsx from 'clsx';

import { useAutoFocus } from '~/hooks';
import { useAuthSelector } from '~/redux/selectors';
import { commaBetweenNumbers, getNameInMail } from '~/helpers/format';

import Skeleton from '~/components/Skeleton';
import IconEmoji from '~/components/Icon/IconEmoji';
import CreatorFormLocation from './CreatorFormLocation';

interface CreatorFormProps {
  caption: string;
  onChangeCaption: (text: string) => void;
}

const MAX_CHARS = 2200;

const CreatorForm = ({ caption, onChangeCaption }: CreatorFormProps) => {
  const { focusRef } = useAutoFocus();

  const { currentUser } = useAuthSelector();

  return (
    <div className='lg:w-2/5 border-l border-line border-t lg:border-t-0'>
      <div className='px-3 py-4'>
        <div className='flex items-center'>
          <Skeleton
            objectFit='cover'
            rounded
            className='w-7 h-7 mr-2'
            src={currentUser!.avatar ?? 'avatar.png'}
            alt='Avatar'
          />
          <span className='font-bold text-base'>{getNameInMail(currentUser!.email)}</span>
        </div>
        <textarea
          ref={focusRef}
          value={caption}
          onChange={(e) => {
            onChangeCaption(e.target.value.substring(0, MAX_CHARS));
          }}
          className={clsx('w-full mt-3 resize-none text-sm', 'placeholder:text-base')}
          placeholder='Write a caption...'
          name=''
          id=''
          rows={10}
        ></textarea>
        <div className='flex-between'>
          <IconEmoji className={clsx('fill-base-gray', 'cursor-pointer')} />
          <span className={clsx('text-sm-1', 'text-base-gray')}>
            {commaBetweenNumbers(caption.length)}/{commaBetweenNumbers(MAX_CHARS)}
          </span>
        </div>
      </div>

      <CreatorFormLocation
        onChange={(e) => {
          onChangeCaption(e.target.value);
        }}
      />
    </div>
  );
};

export default CreatorForm;
