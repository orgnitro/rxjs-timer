import { subscriber } from '../App'
 

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_TIME": {
      const hourInt = Math.floor(action.payload / (60*60));
      const minInt = Math.floor(action.payload / 60);
      const secInt = action.payload % 60;

      return {
        ...state,
        time: {
          sec: (secInt < 10) ? `0${secInt}` : secInt,
          min: (minInt < 10) ? `0${minInt}` : minInt,
          hours: (hourInt < 10) ? `0${hourInt}` : hourInt,
        }
      }
    }
    case "START/STOP_HANDLER": {
      if (state.isRunning) {
        subscriber.next({value: 0, timerIsRunning: false});
        return {
          ...state, 
          isRunning: false,
        }
      } else {
        subscriber.next({timerIsRunning: true});
        return {...state, isRunning: true}
      }
    }
    case "WAIT_HANDLER": {
      if (state.waitBtnClicked) {
        subscriber.next({timerIsRunning: false});
        return {...state, isRunning: false}
      } else {
        setTimeout( () => {
          return {...state, waitBtnClicked: false} 
        }, 300);
        return {...state, waitBtnClicked: true}
      }
    }
    case "WAIT_HANDLER_NOT_DBCLICKED":
      return {...state, waitBtnClicked: false}
    case "RESET_HANDLER": {
      subscriber.next({value: 0});
      return state
    }
    default: 
      return state;
  }
}

export default appReducer
