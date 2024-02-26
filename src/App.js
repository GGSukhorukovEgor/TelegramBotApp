import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const {tg} = useTelegram();
  const [date, setDate] = useState(undefined);

  useEffect(() => {
    tg.ready();
    tg.MainButton.setParams({
      text: 'Отправить'
    });
  }, [tg]);

  const onSendData = useCallback(() => {
    const data = date;
    tg.sendData(data);
  }, [tg, date]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [tg, onSendData]);

  const onClickToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
    tg.MainButton.show();
  };

  const onClickYesterday = () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    setDate(yesterday);
    tg.MainButton.show();
  };

  return (
    <div className="App">
      <div>
        <div>
        <button className='buttonYesterday' onClick={onClickYesterday}>Вчера</button>
        <button className='buttonToday' onClick={onClickToday}>Сегодня</button>
        </div>
        <input
          type='date'
          value={date}
          onChange={e => { setDate(e.target.value); tg.MainButton.show(); }}
        />
      </div>
    </div>
  );
}

export default App;