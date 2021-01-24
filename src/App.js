import './App.css';
import Btn from './components/Btn';
import Settings from './components/Settings';
import React, {useState} from 'react';


function App() {
  const [sessionTime, setSessionTime] =useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [time, setTime] = useState(25);

  const onClickSB = (e) => {
    const body = document.querySelector('body');
    if (e.target.className === 'break simple') {
      body.classList.add('on');
      setTime(breakTime)
    }else {
      body.classList.remove('on')
      setTime(sessionTime)
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

  const settingTime = (e) => {
    if (e.target.id === "break-increment") {
      setBreakTime(breakTime + 1);
      if (document.querySelector('body').classList.value === 'on') {
        setTime(breakTime+1);
      }
    } else if (e.target.id === "session-increment") {
      setSessionTime(sessionTime + 1);
      if (document.querySelector('body').classList.value !== 'on') {
        setTime(sessionTime+1);
      }
    } else if (e.target.id === "break-decrement") {
      if (breakTime > 0) {
        setBreakTime(breakTime - 1);
        if (document.querySelector('body').classList.value === 'on') {
          setTime(breakTime-1);
        }
      }else {
        console.log("Break time is too low...")
      }
    } else {
      if (sessionTime > 0) {
        setSessionTime(sessionTime - 1);
        if (document.querySelector('body').classList.value !== 'on') {
          setTime(sessionTime-1);
        }
      } else {
        console.log("Session time is too low...")
      }
    }
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
        <h3 id='timer-label'>Session</h3>
        <h1 id='time_left'>{time + ':00'}</h1>
        <div className='bottom_btn'>
          <Btn
            id='start_stop'
            className='start_stop specific'
            func={startStop}
            content='Start'
          />
          <Btn
            id='reset'
            className='reset specific'
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
