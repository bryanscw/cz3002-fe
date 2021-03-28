import React, { Component } from 'react';
import { createDot } from './util';

class ListDot extends Component {
  dots = [];
  valX = [];
  valY = [];
  dotNum = this.props.nodeNum;

  generateDots() {

    for (let i = 0; i < this.dotNum; i++) {
      const dot = createDot(i + 1, this.props.func);
      if (this.valX.length === 0) {
        this.valX.push(dot.props.x);
        this.valY.push(dot.props.y);
        this.dots.push(dot);
        continue;
      }
      let overlap = false;
      for (let j = 0; j < this.valX.length; j++) {
        if (Math.abs(dot.props.x - this.valX[j]) < 33) {
          overlap = true;
          break;
        }
      }
      if (overlap === true) {
        i--;
        continue;
      }
      for (let z = 0; z < this.valY.length; z++) {
        if (Math.abs(dot.props.y - this.valY[z]) < 90) {
          break;
        }
      }

      if (overlap === true) {
        i--;
        continue;
      }

      this.valX.push(dot.props.x);
      this.valY.push(dot.props.y);
      this.dots.push(dot);
    }
    this.forceUpdate();
  }

  clearDots = () => {
    for (let i = 0; i < this.props.nodeNum; i++) {
      this.valX.pop();
      this.valY.pop();
      this.dots.pop();
    }
    this.forceUpdate();
  };

  render() {
    return ([
      this.dots.map((dot) => <ul>{dot}</ul>),
    ]);
  }
};

export default ListDot;