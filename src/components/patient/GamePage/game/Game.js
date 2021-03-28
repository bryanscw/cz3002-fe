import React, { Component } from "react";
import Result from './Result';
import Control from './Control';
import ListDot from './ListDot';
import './game.css';
import Line from './Line';
import { List } from "@material-ui/core";

class Game extends Component {

    constructor(props) {

        super(props);

        this.state = {
          valX: [],
          valY: [],
          count: 1,
          total: 0,
          accuracy: 0,
          time: 0,
          mistake: 0,
        };

        this.ListDot = React.createRef();

    }

    clock = 0;

    click = (i) => {

        const c = this.state.count;
        var m = this.state.mistake;
        var t = this.state.total;

        if(this.state.count === i){
            this.setState({
                count: c + 1,
            }) 
        }
        else{
            // alert("Wrong");
            this.setState({
                mistake: m + 1,
            })
            m = m + 1;
        }

        t = t + 1;
        this.setState({
            total: t,
            accuracy: Math.round((t-m)/t*100),
        })  

    };

    start = () => {

        if(this.ListDot.current.dots.length !== 0){
            return;
        }
        this.tick();
        this.ListDot.current.generateDots();
        this.setState({
            valX: this.ListDot.current.valX,
            valY: this.ListDot.current.valY,
        })

    }

    clear = () => {

        this.ListDot.current.clearDots();
        clearInterval(this.clock);
        this.setState({
            valX:[],
            valY:[],
            count:1,
            total:0,
            accuracy: 0,
            time: 0,
            mistake:0,
        })

    }

    tick = () => {

        const date = new Date();
        this.clock = setInterval( () => this.setState({
            time: parseInt((new Date() - date)/1000),
        }),1000)

    }

  render() {

      return (

        <div className="main">
        <div className="panel">
            <Control start = {this.start} clear = {this.clear}/>
            <Result time={this.state.time} accuracy={this.state.accuracy}/>
        </div>
        <div className="field">
            <ListDot nodeNum = { this.props.nodeNum } func = { this.click } ref = {this.ListDot}/>
            <Line valX = { this.state.valX } valY = { this.state.valY } count = { this.state.count }/>
        </div>   
      </div>
      
      )
  }
}
export default Game;



