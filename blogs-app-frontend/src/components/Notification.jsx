const Notification = ({ message }) => {
  const notificationStyle = {
    backgroundColor: "rgb(51, 181, 255)",
    color: "#FFF",
    padding: 2,
    margin: 5,
  };
  if (message === null) {
    return null;
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
