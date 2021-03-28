import React from 'react';
import Line from './Line';
import { createDot } from './util';

const ListDot = (props) => {
  const dots = [];
  const valX = [];
  const valY = [];
  const dotNum = props.nodeNum;

  for (var i = 0; i < dotNum; i++) {
    const dot = createDot(i + 1);
    if (valX.length === 0) {
      valX.push(dot.props.x);
      valY.push(dot.props.y);
      dots.push(dot);
      continue;
    }
    var overlap = false;
    for (var j = 0; j < valX.length; j++) {
      if (Math.abs(dot.props.x - valX[j]) < 33) {
        overlap = true;
        break;
      }
    }
    if (overlap === true) {
      i--;
      continue;
    }
    for (var z = 0; z < valY.length; z++) {
      if (Math.abs(dot.props.y - valY[z]) < 90) {
        break;
      }
    }

    if (overlap === true) {
      i--;
      continue;
    }

    valX.push(dot.props.x);
    valY.push(dot.props.y);
    dots.push(dot);
  }

  return ([
    dots.map((dot) => <ul>{dot}</ul>),
    <Line valX={valX} valY={valY} nodeNum={props.nodeNum} />,
  ]);
};

export default ListDot;