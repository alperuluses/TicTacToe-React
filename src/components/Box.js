const Box = (props) => {
  return <div className={`box ${props.gameOver}`}>{props.innerValue}</div>;
};

export default Box;
