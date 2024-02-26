import React, { useState, useCallback, useEffect } from 'react';
import './SelectDate.css';
import { useTelegram } from '../../hooks/useTelegram';

const SelectDate = () => {

    const {tg} = useTelegram();
    const [date, setDate] = useState(undefined);

    useEffect(() => {
    tg.ready();
    tg.MainButton.setParams({
        text: 'Отправить'
    });
    }, [tg]);

    const onSendData = useCallback(() => {
        tg.sendData(date);
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
    
    return(
        <div className='selectDate'>
            <button className='buttonYesterday' onClick={onClickYesterday}>Вчера</button>
            <input
                type='date'
                value={date}
                onChange={e => { setDate(e.target.value); tg.MainButton.show(); }}
            />
            <button className='buttonToday' onClick={onClickToday}>Сегодня</button>
        </div>
    );
};

export default SelectDate;

