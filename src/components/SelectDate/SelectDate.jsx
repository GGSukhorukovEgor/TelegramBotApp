import React, { useState, useCallback, useEffect } from 'react';
import './SelectDate.css';
import { useTelegram } from '../../hooks/useTelegram';

const SelectDate = () => {
    const { tg } = useTelegram();
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

    const generateDates = () => {
        const dates = [];
        for (let i = 7; i > 1; i--) {
            const today = new Date();
            const fiveDaysAgo = new Date(today);
            fiveDaysAgo.setDate(today.getDate() - i);
            dates.push(fiveDaysAgo);  
        }
        return dates;
    };

    const dateToString = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}.${month}`;
    }

    const dates = generateDates();

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

    const calculateMaxButtonSize = () => {
        const buttons = document.querySelectorAll('.day-btn');
        let maxWidth = 0;
        let maxHeight = 0;
        buttons.forEach(button => {
        const width = button.offsetWidth;
        const height = button.offsetHeight;
        if (width > maxWidth) {
            maxWidth = width;
        }
        if (height > maxHeight) {
            maxHeight = height;
        }
        });
        return { width: maxWidth, height: maxHeight };
    };

    const setButtonSizes = useCallback(() => {
        const buttons = document.querySelectorAll('.day-btn');
        const maxButtonSize = calculateMaxButtonSize();
        buttons.forEach(button => {
        button.style.width = `${maxButtonSize.width}px`;
        button.style.height = `${maxButtonSize.height}px`;
        });
    }, []);

    useEffect(() => {
        setButtonSizes();
        window.addEventListener('resize', setButtonSizes);
        return () => {
        window.removeEventListener('resize', setButtonSizes);
        };
    }, [setButtonSizes]);

    return (
        <div className='selectDate'>
            <input
                type='date'
                value={date}
                onChange={(e) => { setDate(e.target.value); tg.MainButton.show(); }}
            />
            <div className='days-btn'>
                 {dates.map((date) => {
                     return (
                         <button className='day-btn' onClick={() => {setDate(date.toISOString().slice(0, 10)); tg.MainButton.show();}}>
                             {dateToString(date)}
                         </button>
                     );
                 })}
                 <button className='day-btn' onClick={onClickYesterday}>Вчера</button>
                 <button className='day-btn' onClick={onClickToday}>Сегодня</button>
             </div>
        </div>
    );
};

export default SelectDate;