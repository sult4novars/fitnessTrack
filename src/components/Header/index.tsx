import Container from '../Container';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';

const Header = () => {
  //  const router = useRouter();

  return (
    <header
      className={`
        'fixed top-0 left-0 right-0 z-40',
        'border-b border-1 border-line',
        'bg-white',
      `}
    >
      <Container className='grid md:grid-cols-2 items-center justify-between h-header-h py-3 px-4 lg:px-0 mt-0'>
        <HeaderMiddle />
        <HeaderRight />
      </Container>
    </header>
  );
};

export default Header;
