import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useAuthSelector } from '~/redux/selectors';
import { ROUTES } from '~/constants';
import { useClickOutside } from '~/hooks';
import IconCreate from '../Icon/IconCreate';
import IconHome from '../Icon/IconHome';
import WalkIcon from '../Icon/WalkIcon';
import IconMessenger from '../Icon/IconMessenger';
import Skeleton from '../Skeleton';

import HeaderRightMenu from './HeaderRightMenu';
import WalkCalculateMenu from './WalkCalculateMenu';

const HeaderRight = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isShowWalkCalculate, setIsShowWalkCalculate] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const walkCalculateIconRef = useRef<HTMLDivElement>(null);
  const walkCalculateRef = useRef<HTMLDivElement>(null);

  const { modalTypes, showModal } = useModalContext();
  const { currentUser } = useAuthSelector();

  const router = useRouter();

  useClickOutside([menuRef, avatarRef], () => setIsShowMenu(false));
  useClickOutside([walkCalculateRef, walkCalculateIconRef], () => setIsShowWalkCalculate(false));

  return (
    <div className='flex items-center justify-end gap-x-5'>
      <div className={clsx('relative', 'flex-shrink-0', 'cursor-pointer')}>
        <WalkIcon
          ref={walkCalculateIconRef}
          onClick={() => setIsShowWalkCalculate(!isShowWalkCalculate)}
          className={clsx('flex-shrink-0', 'cursor-pointer')}
        />
        {isShowWalkCalculate && <WalkCalculateMenu ref={walkCalculateRef} />}
      </div>
      <IconHome
        onClick={() => router.push(ROUTES.HOME)}
        className={clsx('flex-shrink-0', 'cursor-pointer')}
        active={router.pathname === ROUTES.HOME}
      />
      <IconMessenger
        onClick={() => router.replace(ROUTES.INBOX, undefined, { shallow: true })}
        className={clsx('flex-shrink-0', 'cursor-pointer')}
        active={router.pathname === ROUTES.INBOX}
      />
      <IconCreate
        onClick={() => showModal(MODAL_TYPES.POST_CREATOR)}
        className={clsx('flex-shrink-0', 'cursor-pointer')}
        active={modalTypes.includes(MODAL_TYPES.POST_CREATOR)}
      />

      <div className={clsx('relative', 'flex-shrink-0', 'cursor-pointer')}>
        <Skeleton
          ref={avatarRef}
          objectFit='cover'
          onClick={() => setIsShowMenu(!isShowMenu)}
          rounded
          className='w-7 h-7'
          src={currentUser?.avatar ?? 'avatar.png'}
        />
        {isShowMenu && <HeaderRightMenu ref={menuRef} />}
      </div>
    </div>
  );
};

export default HeaderRight;
