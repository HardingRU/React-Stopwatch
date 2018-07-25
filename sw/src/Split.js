import React, {Component} from 'react'



class Split extends Component {

  constructor(props) {
    super()
    this.state = {
      seconds: 0,
      minutes: 0,
    }
    this.sendDataToParent = this.sendDataToParent.bind(this);
  }

  // keep track of the minutes and seconds of the split component that was created
  componentDidMount() {
    this.setState({
      seconds: this.props.seconds,
      minutes: this.props.minutes
    })
  }

  // leverage callback function that was passed from parent as props to send back minutes and seconds of split clicked
  sendDataToParent() {
    this.setState({
      color: "red"
    })
    this.props.callback(this.state.minutes, this.state.seconds)
  }

	render(){
		return (
      this.props.seconds < 10 ?
      <li className={this.state.color} onClick={this.sendDataToParent}>{this.props.minutes}:0{this.props.seconds}</li> :
      <li className={this.state.color} onClick={this.sendDataToParent}>{this.props.minutes}:{this.props.seconds}</li>
		)
	}

}

export default Split
