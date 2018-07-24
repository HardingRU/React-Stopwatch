import React, { Component } from 'react';
import './App.css';
import Split from './Split'


class App extends Component {
  constructor(props) {
    super()
    this.state = {
      seconds: 0,
      minutes: 0,
      started: false,
      splitDivs: [],
      splitTimes: [],
      keyCounter: 0
    }
    this.click = this.click.bind(this);
    this.splitClick = this.splitClick.bind(this);
  }

  splitClick(minutes, seconds) {
    // splitData is compared to the splitTimes array in state to find the clicked split,
    // and then remove it and all that follow
    // after removal, sets current seconds and minutes to be equal to the split that was clicked
    let splitData = minutes+":"+seconds
    let tempTimesArray = this.state.splitTimes.slice(0, this.state.splitTimes.indexOf(splitData) + 1)
    let tempDivsArray = this.state.splitDivs.slice(0, this.state.splitTimes.indexOf(splitData) + 1)
    console.log(tempTimesArray)
    console.log(tempDivsArray)
    this.setState({
      splitDivs: tempDivsArray,
      splitTimes: tempTimesArray,
      seconds: seconds,
      minutes: minutes
    })
  }

  click() {
    // only start counter on first click
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
    // for all other clicks, create a Split component as necessary
    else {
      let tempArray = [(this.state.minutes+":"+this.state.seconds)]
      // ensures that splits are unique
      if(this.state.splitTimes.indexOf(tempArray[0]) === -1) {
        // create Split component with data required to render and track
        // keep track of splitTimes for each Split component in separate array, which will be used to find the correct splits for removal purposes
        this.setState({
          splitDivs: this.state.splitDivs.concat(<Split callback={this.splitClick} minutes={this.state.minutes} seconds={this.state.seconds} key={this.state.keyCounter}/>),
          splitTimes: this.state.splitTimes.concat(tempArray),
          // simple way to ensure that all children component have a unique key
          keyCounter: this.state.keyCounter + 1
        })
      }
    }

  }

  // code to convert seconds to minutes as required
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
        <ul>
          {this.state.splitDivs}
        </ul>
      </div>
    );
  }
}


export default App;
