import clsx from 'clsx';

import { PostFragment } from '~/types/generated';
import { usePost } from '~/hooks';

import IconComment from './Icon/IconComment';
import IconHeart from './Icon/IconHeart';

interface ActionsProps {
  post: PostFragment;
  className?: string;
  onComment?: () => void;
}

const Actions = ({ className, post, onComment }: ActionsProps) => {
  const { isLiked, reactPost } = usePost(post);

  return (
    <div className={clsx('flex-between', className)}>
      <div className={clsx('flex items-center gap-x-3')}>
        <IconHeart
          onClick={reactPost}
          className={clsx('cursor-pointer', !isLiked && 'hover:opacity-60')}
          active={isLiked}
        />
        <IconComment onClick={onComment} className={clsx('cursor-pointer', 'hover:opacity-60')} />
      </div>
    </div>
  );
};

export default Actions;
