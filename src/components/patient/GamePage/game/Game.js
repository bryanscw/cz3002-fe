import React, { Component } from 'react';
import Result from './Result';
import Control from './Control';
import ListDot from './ListDot';
import './game.css';
import { connect } from 'react-redux';
import Line from './Line';
import { updateResult } from '../../../../redux/ducks/result';
import PropTypes from 'prop-types';

class Game extends Component {

  clock = 0;

  constructor(props) {

    super(props);

    this.state = {
      id: props.id,
      valX: [],
      valY: [],
      count: 1,
      total: 0,
      accuracy: 0,
      time: 0,
      mistake: 0,
      nodeNum: props.nodeNum,
    };

    this.ListDot = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {

    event.preventDefault();
    this.props.updateResult(this.state);
    console.log(localStorage.getItem('acessToken'));
    window.location.reload(false);

  }

  click = (i) => {

    const c = this.state.count;
    let m = this.state.mistake;
    let t = this.state.total;

    if (this.state.count === i) {
      this.setState({
        count: c + 1,
      });
    } else {
      // alert("Wrong");
      this.setState({
        mistake: m + 1,
      });
      m = m + 1;
    }

    t = t + 1;
    this.setState({
      total: t,
      accuracy: Math.round((t - m) / t * 100),
    });

  };

  start = () => {

    if (this.ListDot.current.dots.length !== 0) {
      return;
    }
    this.tick();
    this.ListDot.current.generateDots();
    this.setState({
      valX: this.ListDot.current.valX,
      valY: this.ListDot.current.valY,
    });

  };

  clear = () => {

    this.ListDot.current.clearDots();
    clearInterval(this.clock);
    this.setState({
      valX: [],
      valY: [],
      count: 1,
      total: 0,
      accuracy: 0,
      time: 0,
      mistake: 0,
    });

  };

  tick = () => {

    const date = new Date();
    this.clock = setInterval(() => this.setState({
      time: parseInt((new Date() - date) / 1000),
    }), 1000);

  };

  render() {

    return (

      <div className="main">
        <div className="panel">
          <Control start={this.start} clear={this.clear} submit={this.handleSubmit} />
          <Result time={this.state.time}
            accuracy={this.state.accuracy}
            completed={this.state.count - 1}
            progress={(this.state.count - 1) / this.state.nodeNum * 100} />
        </div>
        <div className="field">
          <ListDot nodeNum={this.props.nodeNum} func={this.click} ref={this.ListDot} />
          <Line valX={this.state.valX} valY={this.state.valY} count={this.state.count} />
        </div>
      </div>

    );
  }
}

Game.propTypes = {
  /** An action creator for authenticating login */
  updateResult: PropTypes.func.isRequired,
};

const dispatchers = {
  updateResult,
};

export default connect(() => ({}), dispatchers)(Game);


