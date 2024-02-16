import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const message = useSelector(({ notification }) => notification.message)

  if (message === '') {
    return null;
  }

  return (
    <Alert variant='primary'>
      {message}
    </Alert>
  );
};

export default Notification; 
