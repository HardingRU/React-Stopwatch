import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 55,
      minutes: 0,
      started: false,
      splits: []
    }
    this.increment = null;
    this.click = this.click.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
  }

  // https://stackoverflow.com/questions/35905988/react-js-how-to-append-a-component-on-clicks

  click() {
    if(this.state.started === false) {
      this.setState({
        started: true
      })
      this.increment = setInterval( () =>
        this.setState({
          seconds: this.state.seconds + 1,
        })
      , 1000);
    }
    else {
      this.setState({
        splits: this.state.splits.concat(<Split seconds={this.state.seconds} minutes={this.state.minutes} key={this.state.splits.length + 1} number={this.state.splits.length + 1}/>)
      })
    }

  }
  
  componentDidUpdate() {
    if(this.state.seconds === 60) {
      this.setState({
        seconds: 0,
        minutes: this.state.minutes + 1
      })
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.seconds < 10 ? <h1>{this.state.minutes}:0{this.state.seconds}</h1> : <h1>{this.state.minutes}:{this.state.seconds}</h1>}
        <button onClick={this.click}>CLICK!</button>
        <br/>
        <br/>
        {this.state.splits}
      </div>
    );
  }
}



function Split(props) {
  if(props.seconds < 10) {
    return (<div>
      <div onClick={(e) => test(e.target)} minutes={props.minutes}>Split {props.number} - {props.minutes}:0{props.seconds}</div>
      <br/>
    </div>)
  }
  else {
    return (<div>
      <div onClick={(e) => test(e.target)} minutes={props.minutes}>Split {props.number} - {props.minutes}:{props.seconds}</div>
      <br/>
    </div>)
  }
}

function test(props) {
  console.log(props)
}

export default App;
