import React, { useEffect, useReducer, } from 'react'
import { Subject, interval, NEVER } from 'rxjs'
import { switchMap, scan, startWith, tap } from 'rxjs/operators'
import './App.css'

import TimerScreen from './components/TimerScreen'
import StartStopBtn from './components/StartStopBtn'
import WaitBtn from './components/WaitBtn'
import ResetBtn from './components/ResetBtn'
import appReducer from './components/appReducer'


const initialState = {
  time: {sec: '00', min: '00', hours: '00'},
  counterVal: 0,
  isRunning: false,
  waitBtnClicked: false
}

export const timerSource = new Subject();

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect( () => {
    timerSource.pipe(
      startWith({ value: 0, timerIsRunning: false }),
      scan( (acc, val) => ({ ...acc, ...val })),
      tap( current => {
        dispatch({
          type: "SET_TIME",
          payload: current.value
        });
      }),
        switchMap( current => !current.timerIsRunning ? NEVER : interval(1000).pipe(
          tap( () => {
            current.value += 1;
            dispatch({
              type: "SET_TIME",
              payload: current.value
            });
          })
        ))
      ).subscribe();
  }, []);

  return (
    <div className="App">
      <TimerScreen 
        hours={state.time.hours}
        minutes={state.time.min}
        seconds={state.time.sec}
      />
      <StartStopBtn handler={() => dispatch({type: "START/STOP_HANDLER"})} />
      <WaitBtn handler={() => {
        dispatch({type: "WAIT_HANDLER"});
        setTimeout(() => {dispatch({type: "WAIT_HANDLER_NOT_DBCLICKED"})}, 300)
        }} 
      />
      <ResetBtn handler={() => dispatch({type: "RESET_HANDLER"})} />
    </div>
  )
}

export default App
