import './App.css';
import Btn from './components/Btn';


function App() {
  const onClickSB = (e) => {
    const body = document.querySelector('body');
    if (e.target.className === 'break simple') {
      body.classList.add('on')
    }else {
      body.classList.remove('on')
    }
  };
  const startStop = () => {
    const content = document.getElementById('start_stop');
    const wrapper = document.getElementById('wrapper');
    const simpleBtns = document.querySelectorAll('.simple')
    if (content.innerHTML === 'Start') {
      content.innerHTML = 'Stop';
      wrapper.classList.add('start');
      for (let i=0; i< simpleBtns.length; i++) {
        simpleBtns[i].disabled = true;
      }
    } else {
      content.innerHTML = 'Start';
      wrapper.classList.remove('start');
      for (let i=0; i< simpleBtns.length; i++) {
        simpleBtns[i].disabled = false;
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
        <h1 id='time_left'>25:00</h1>
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
      Setting button
      <div className="settings">Two setting component</div>
    </div>
  );
}

export default App;
