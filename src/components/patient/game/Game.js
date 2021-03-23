import React from "react";
import './App.css';
import Dot from './Dot';
import Line from './line';
import { COLORS, SIZES } from '../../../utils/constants';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {createResult} from '../../../redux/ducks/result'
import {Component} from 'react'
import PropTypes from "prop-types";


class Game extends Component{
  constructor(props){
    super(props);
    this.state= {
      id : null,
      createdBy : null,
      createdDate : null,
      lastModifiedBy : null,
      lastModifiedDate : null,
      user:null,
      accuracy:null,
      time:null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      ...this,
      ...{
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event){
    console.log("Result has been submitted.");
    event.preventDefault();
    this.props.createResult(this.state);
    this.props.history.push("/Game");
    console.log(localStorage.getItem("acessToken"));
    window.location.reload(false);
  }

  stat=true;
  time=0;
  start={"minute":0,"second":0};
  count=1;
  total=0;
  accuracy=0;
  mistakes=0; 
  dots = []
  valX = []
  valY = []
  colorarray =[]
  sizearray =[]
  //25 dots in total
  dotNum = 25;

  render(){
    return (
    <div className="main">
          <div className="panel">
          <div className="control">
            <div className="control__buttons">
                {
                  <form onSubmit={this.handleSubmit}>
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={this.startGame}>START</Button>
                    <Button onClick={this.calculateResult}>STOP</Button>
                    <Button type='submit'>SUBMIT</Button>
                    </ButtonGroup>  
                  </form>                
                }
                {/* <button o.nClick={onClear}>CLEAR</button> */}
            </div>
          </div>
            <div className="time">
              <p name="time" onChange={this.handleChange}>{`Time: ${this.time}s`}</p>
              <p name="accuracy" onChange={this.handleChange}>{`Accuracy: ${this.accuracy}%`}</p>
            </div>
          </div>
          <div className="field" >
           {this.renderdots()}
           <Line valX={this.valX} valY={this.valY} count={this.count}></Line>
          </div>
      </div>
  );
  }

  random = () => {
    for (var i = 0; i < this.dotNum; i++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const size = SIZES[Math.floor(Math.random() * SIZES.length)]
      let x = Math.floor(Math.random() * 1200);
      let y = Math.floor(Math.random() * 450);
      var overlap = false;

      if(overlap === true){
        i--;
        continue;
      }

    for(var z = 0; z<this.valY.length; z++){
      //check for overlap
      if(Math.abs(y - this.valY[z])<40 && Math.abs(x- this.valX[z])<40){
        overlap = true;
        break;
      }
    }
  
    if(overlap === true){
      i--;
      continue;
    }

    //if no overlap
    this.valX.push(x);
    this.valY.push(y);
    this.colorarray.push(color);
    this.sizearray.push(size);
    this.forceUpdate();
  }
}

  clearDots = () => {
    for(var i=0;i<25;i++){
      this.valX.pop();
      this.valY.pop();
    }
  }

  click = (i) => {
    this.total=this.total+1;

    if (this.count===i){
      //alert("correct");
      this.count = this.count+1; 
    }

    else{
      console.log("count",this.count);
      alert("wrong");
      this.mistakes = this.mistakes+1;
    }

    this.forceUpdate();
  }

  renderdots = () => {

    if(!this.stat){
      return null;
    }

    return (
      <>{this.valX.map((x,index)=> (
        <Dot color={this.colorarray[index]}
             x={x}
             y={this.valY[index]}
             size={this.sizearray[index]}
             func={this.click}
             i={index+1} ></Dot>
      ))}
      </>)
  }

  startGame=()=> {
      alert("Game starts!");
      this.stat = true;

      this.clearDots();
      this.random();
      this.renderdots();

      this.time = 0;
      this.count=1;
      this.accuracy = 0;
      this.mistakes = 0;
      this.total = 0;

      var starttime = {
        "minute":new Date().getMinutes(),
        "second":new Date().getSeconds()
      }

      this.start = starttime;
      this.forceUpdate();
  }

  calculateResult = () => {
    if(this.count != 26){
      alert("You have not completed the test!")
      return;
    }

    this.accuracy = parseFloat((this.total-this.mistakes)/this.total).toPrecision(2)*100;
    this.setState({accuracy:this.accuracy});
    this.count = 1;
    this.total = 0;
    this.mistakes = 0;

    var Time = {
      "Minute":new Date().getMinutes() - this.start.minute,
      "Second":new Date().getSeconds() - this.start.second
    }

    var t = Time.Minute*60+Time.Second;

    if(Time.Second<this.start.second){
      Time.Minute = Time.Minute - 1;
      Time.Second = Time.Second + 60;
    }

    this.time = t;
    this.setState({time:t});
    this.forceUpdate();
  }
}

Game.propTypes = {
  /** An action creator for authenticating login */
  createResult: PropTypes.func.isRequired
};

const dispatchers = {
  createResult
};

export default connect(() => ({}), dispatchers)(Game)