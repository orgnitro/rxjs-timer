import React, { Component } from 'react'
import TimerScreen from './TimerScreen'
import StartStopBtn from './StartStopBtn'
import WaitBtn from './WaitBtn'
import ResetBtn from './ResetBtn'

import { interval, NEVER, Subject } from 'rxjs'
import { switchMap, scan, startWith, tap } from 'rxjs/operators'


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      time: {
        seconds: '00',
        minutes: '00',
        hours: '00',
      },
      waitBtnClicked: false,
      counterVal: 0,
      isRunning: false
    }
    this.subject = new Subject();

    this.setTime = this.setTime.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.waitHandler = this.waitHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
  }

    startHandler() {
      if (this.state.isRunning) {
        this.subject.next({counterVal: 0, isRunning: false});
        this.setState({isRunning: false, counterVal: 0});
      } else {
        this.subject.next({isRunning: true});
        this.setState({isRunning: true});
      }
    }

    waitHandler() {
      if (this.state.waitBtnClicked) {
        this.subject.next({isRunning: false});
        this.setState({isRunning: false});
      } else{
        this.setState({waitBtnClicked: true});
        setTimeout(() => {
          this.setState({waitBtnClicked: false});
        }, 300);
      }
    }

    resetHandler() {
      this.subject.next({counterVal: 0});
      this.setState({counterVal: 0});
    }

    setTime(val) {
      const hourInt = Math.floor(val / (60*60));
      const minInt = Math.floor(val / 60);
      const secInt = val % 60;

      this.setState({
        time: {
          hours: (hourInt < 10) ? `0${hourInt}` : hourInt,
          minutes: (minInt < 10) ? `0${minInt}` : minInt,
          seconds: (secInt < 10) ? `0${secInt}` : secInt
        }
      });
    }

    componentDidMount() {
      this.subject.pipe(
        startWith({counterVal: 0, isRunning: false}),
        scan( (acc, val) => ({ ...acc, ...val })),
        tap( current => {
          this.setTime(current.counterVal);
        }),
        switchMap( current => !current.isRunning ? NEVER : interval(1000).pipe(
          tap( () => {
            current.counterVal += 1;
            this.setTime(current.counterVal);
          })
        ))
      ).subscribe();
    }

  render() {
    const hours = this.state.time.hours;
    const minutes = this.state.time.minutes;
    const seconds = this.state.time.seconds;
    const appStyle = {
      fontSize: '2vw',
      backgroundColor: '#333333',
      borderRadius: '5px',
      width: '40%',
      height: '40%',
      margin: 'auto',
      padding: '20px 5px'
    }
    
    return (
      <div style={appStyle}>
      <TimerScreen hours={hours} minutes={minutes} seconds={seconds} />
      <StartStopBtn handler={this.startHandler} />
      <WaitBtn handler={this.waitHandler} />
      <ResetBtn handler={this.resetHandler} />
      </div>
    )
  }
}
