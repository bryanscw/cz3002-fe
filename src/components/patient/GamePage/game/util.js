import Dot from './Dot';

export const createDot = (randomNumber, click) => {
  const size = 35;
  let x = Math.floor(Math.random() * 1000);
  let y = Math.floor(Math.random() * 450);

  return <Dot color="primary"
    key={randomNumber}
    x={x}
    y={y}
    size={size}
    randomNumber={randomNumber}
    func={click} />;
};

