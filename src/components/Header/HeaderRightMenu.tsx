import { forwardRef } from 'react';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { useUser } from '~/hooks';

const HeaderRightMenu = forwardRef<any, any>((_props, forwardRef) => {
  const { currentUser, visitProfile, logout } = useUser();

  return (
    <ul
      ref={forwardRef}
      className={clsx(
        'absolute top-[calc(100%+10px)] -right-4',
        'rounded-md shadow-[0_1px_5px_1px_rgba(0,0,0,0.0975)] w-52 text-sm',
        'bg-white',
      )}
    >
      <li
        onClick={() => visitProfile(currentUser.username)}
        className={clsx('flex items-center py-3 pl-4', 'select-none', 'hover:bg-gray-50')}
      >
        <FontAwesomeIcon className='mr-3' icon={faUser} />
        <span>Profile</span>
      </li>
      <li
        onClick={logout}
        className={clsx(
          'flex items-center py-3 pl-4 border-t border-line',
          'select-none',
          'hover:bg-gray-50',
        )}
      >
        Log Out
      </li>
    </ul>
  );
});

HeaderRightMenu.displayName = 'HeaderRightMenu';

export default HeaderRightMenu;
