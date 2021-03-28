import Dot from './Dot'

export const createDot = (randomnumber,click) => {
    const size = 35; 
    let x = Math.floor(Math.random() * 1000);
    let y = Math.floor(Math.random() * 450);

    return <Dot color="primary" x={x} y={y} size={size} randomnumber={randomnumber} func={click} ></Dot>
};

