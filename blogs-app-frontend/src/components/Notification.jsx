import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(({ notification }) => notification.message)

  const notificationStyle = {
    backgroundColor: "rgb(51, 181, 255)",
    color: "#FFF",
    padding: 2,
    margin: 5,
  };
  if (message === '') {
    return null;
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification; 
