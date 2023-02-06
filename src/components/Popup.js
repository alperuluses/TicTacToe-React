const Popup = (props) => {
  return (
    <div className="popup">
      <div className="text">{`${props.text}`}</div>
      <div className="buttons">
        <div className="pixel" onClick={props.onPress}>
          Restart
        </div>
      </div>
    </div>
  );
};

export default Popup;
