import { useCallback, useEffect } from 'react';
import React, { } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;
function App() {

  const [date, setDate] = React.useState(undefined);

  useEffect(() =>{
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close();
  }

  const dateInput = document.getElementById('dateInput');
  dateInput.addEventListener('input', function(event) {
    const selectedDate = event.target.value;
    alert(`Выбрана дата: ${selectedDate}`);
});

  const onSendData = useCallback(()=>{
   const data = date;
    // const t = window.Telegram;
    // const data = JSON.stringify(t);
    tg.sendData(data);
  }, [date])

  useEffect(()=>{
    tg.onEvent('sendData', onSendData)
    return () => {
      tg.offEvent('sendData', onSendData)
    }
  }, [onSendData])

  return (
    <div className="App">
       <div class="calendar-container" id="calendarContainer">
        <input type='date' id='dateInput' onChange={e => setDate(e.target.value)}></input>
        {/* <button onClick={onSendData}>Отправить</button> */}
       </div>
       <div>
        <button onClick={onClose}>Закрыть</button>
       </div>       
    </div>
  );
}

export default App;
