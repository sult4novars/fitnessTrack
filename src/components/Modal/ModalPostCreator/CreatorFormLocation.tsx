import clsx from 'clsx';

import IconLocation from '~/components/Icon/IconLocation';

type CreatorFormLocationProps = {
  onChange: (event: any) => void;
};

const CreatorFormLocation: React.FC<CreatorFormLocationProps> = ({ onChange }) => {
  return (
    <div className='px-3 flex-between border-t border-line'>
      <input
        placeholder='Add location'
        className={clsx(
          'text-sm py-3 h-full w-full',
          'placeholder:text-base-1 placeholder:text-base-gray',
        )}
        onChange={onChange}
      />
      <IconLocation />
    </div>
  );
};

export default CreatorFormLocation;
