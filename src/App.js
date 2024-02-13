import { useCallback, useEffect } from 'react';
import React, { useState } from 'react';
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

  const onSendData = useCallback(()=>{
    const data = date;
    tg.sendData(JSON.stringify(data));
  })

  useEffect(()=>{
    tg.onEvent('sendData', onSendData)
    return () => {
      tg.offEvent('sendData', onSendData)
    }
  }, [])

  return (
    <div className="App">
       <div>
        <input type='date' onChange={e => setDate(e.target.value)}></input>
        <button onClick={onSendData}>Отправить</button>
       </div>
       <div>
        <button onClick={onClose}>Закрыть</button>
       </div>       
    </div>
  );
}

export default App;
