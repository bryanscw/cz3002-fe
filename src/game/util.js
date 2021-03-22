import { COLORS, SIZES } from './constants';
import Dot from './Dot'

export const createDot = (i,click) => {
    // pick random color and size
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const size = SIZES[Math.floor(Math.random() * SIZES.length)]

    let x = Math.floor(Math.random() * 1000);
    let y = Math.floor(Math.random() * 450);

    return <Dot color={color} x={x} y={y} size={size} i={i} func={click} ></Dot>
};