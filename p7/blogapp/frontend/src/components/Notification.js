const Notification = ({ info }) => {
  if (!info.message) {
    return;
  }

  const style = {
    color: info.type === "error" ? "red" : "green",
    background: "lightgrey",
    borderStyle: "solid",
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    position: "fixed",
    right: 0,
  };

  return <div style={style}>{info.message}</div>;
};

export default Notification;
