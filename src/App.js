import { useCallback, useEffect } from 'react';
import React, { } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;
function App() {

  const [date, setDate] = React.useState(undefined);


  useEffect(() => {
    tg.ready();
    tg.MainButton.setParams({
      text: 'Отправить'
    })
    tg.MainButton.show();
  }, [])

  const onSendData = useCallback(()=>{
    const data = date;
     tg.sendData(data);
   }, [date])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return() => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
       <div>
        <input type='date' onChange={e => setDate(e.target.value)}></input>
       </div>
       <div>
        <button onClick={onClose}>Закрыть</button>
       </div>       
    </div>
  );
}

export default App;
