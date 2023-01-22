import clsx from 'clsx';

// types
import { IconProps } from '~/types/utils';

const SpinnerLogo = ({ className }: IconProps) => {
  return <div className={clsx('animate-spinner', className)}>loading...</div>;
};

export default SpinnerLogo;
