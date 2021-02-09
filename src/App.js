import './App.css';
import Btn from './components/Btn';
import Settings from './components/Settings';
import React, {useState, useEffect} from 'react';


function App() {
  const [sessionTime, setSessionTime] =useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [time, setTime] = useState(1500);
  const [operate, setOperate] = useState(false);
  const [state, setState] = useState(true);
  const [display, setDisplay] = useState('Pomodoro Session')

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0 && operate) {
        setTime((t) => t - 1);
        console.log(time, state, display);
      }
    },1000);
    check();
    running()
    return () => clearInterval(timer);
  }
)

  const check = () => {
    let sound = document.getElementById('beep');
    if (time === 0) {
      sound.currentTime = 0;
        if (state) {
          setState((s) => false);
          setTime(breakTime * 60);
          setOperate(true);
        }else {
          setState(true);
          setTime(sessionTime * 60);
          setOperate(true);
        }
        sound.play();
    }
  }

  const running = () => {
    const body = document.querySelector('body');
    if (state) {
      body.classList.remove('on');
      setDisplay('Pomodoro Session');
    }else {
      body.classList.add('on');
      setDisplay('Break Session');
    }
  }

  const onClickSB = (e) => {
    if (e.target.className === 'break simple') {
      setTime(breakTime * 60);
      setState(false);
    }else {
      setTime(sessionTime * 60);
      setState(true);
    }
  };

  const startStop = () => {
    const content = document.getElementById('start_stop');
    const wrapper = document.getElementById('wrapper');
    const simpleBtns = document.querySelectorAll('.simple');
    const btnStettings = document.querySelectorAll('.btn-settings');
    const option = document.querySelectorAll('.option');

    if (content.innerHTML === 'Start') {
      content.innerHTML = 'Stop';
      setOperate(true);
      wrapper.classList.add('start');
      for (let i=0; i<option.length;i++) {
        option[i].classList.add('start')
      }
      for (let i=0; i< simpleBtns.length; i++) {
        simpleBtns[i].disabled = true;
      }
      for (let i=0; i< btnStettings.length; i++) {
        btnStettings[i].disabled = true;
      }
    } else {
      setOperate(false);
      content.innerHTML = 'Start';
      wrapper.classList.remove('start');
      for (let i=0; i<option.length;i++) {
        option[i].classList.remove('start')
      }
      for (let i=0; i< simpleBtns.length; i++) {
        simpleBtns[i].disabled = false;
      }
      for (let i=0; i< btnStettings.length; i++) {
        btnStettings[i].disabled = false;
      }
    }
  }

  const reset = () => {
    let sound = document.getElementById('beep');
    sound.pause();
    sound.currentTime = 0;
    setOperate(false);
    const content = document.getElementById('start_stop');
    const wrapper = document.getElementById('wrapper');
    const simpleBtns = document.querySelectorAll('.simple');
    const btnStettings = document.querySelectorAll('.btn-settings');
    const option = document.querySelectorAll('.option');
    content.innerHTML = 'Start';
    wrapper.classList.remove('start');
    for (let i=0; i<option.length;i++) {
      option[i].classList.remove('start')
    }
    for (let i=0; i< simpleBtns.length; i++) {
      simpleBtns[i].disabled = false;
    }
    for (let i=0; i< btnStettings.length; i++) {
      btnStettings[i].disabled = false;
    }
    setBreakTime(5);
    setSessionTime(25);
    if (!state) {
      setTime(300);
    } else {
      setTime(1500);
    }
  }

  const settingTime = (e) => {
    if (e.target.id === "break-increment") {
      if (breakTime < 59){
        setBreakTime(breakTime + 1);
        if (document.querySelector('body').classList.value === 'on') {
          setTime((breakTime+1) * 60);
        } else {
          console.log("Break time is too high...")
        }
      }
    } else if (e.target.id === "session-increment") {
      if (sessionTime < 59) {
        setSessionTime(sessionTime + 1);
        if (document.querySelector('body').classList.value !== 'on') {
          setTime((sessionTime+1) * 60);
        } else {
          console.log("Session time is too high...")
        }
      }
    } else if (e.target.id === "break-decrement") {
      if (breakTime > 1) {
        setBreakTime(breakTime - 1);
        if (document.querySelector('body').classList.value === 'on') {
          setTime((breakTime-1) * 60);
        }
      }else {
        console.log("Break time is too low...")
      }
    } else {
      if (sessionTime > 1) {
        setSessionTime(sessionTime - 1);
        if (document.querySelector('body').classList.value !== 'on') {
          setTime((sessionTime-1) * 60);
        }
      } else {
        console.log("Session time is too low...")
      }
    }
  }

const timeLeft = () => {
  let mm = Math.floor(time / 60);
  let sec = time - (mm *60);
  if (mm < 10) { mm = '0' + mm;}
  if (sec < 10) { sec = '0' + sec;}
  return mm + ':' + sec;
}

  return (
    <div className="App">
      <div id='wrapper'>
        <div className='top_btn'>
          <Btn
            className='pomodoro simple'
            func={onClickSB}
            content='Pomodoro'
          />
          <Btn
            className='break simple'
            func={onClickSB}
            content='Break'
          />
        </div>
        <h3 id='timer-label'>{display}</h3>
        <h1 id='time-left'>{timeLeft()}</h1>
        <audio
          id='beep'
          src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        />
        <div className='bottom_btn'>
          <Btn
            id='start_stop'
            className='specific'
            func={startStop}
            content='Start'
          />
          <Btn
            id='reset'
            className='specific'
            func={reset}
            content='Reset'
          />
        </div>
      </div>
      <div className="settings">
        <Settings
          id='break'
          content='Break lenth'
          value={breakTime}
          func={settingTime}
        />
        <Settings
          id='session'
          content='Session length'
          value={sessionTime}
          func={settingTime}
        />
      </div>
    </div>
  );
}

export default App;
