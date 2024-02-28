import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TimesheetItem from '../TimesheetItem/TimesheetItem';
import './TimesheetList.css';
import { useTelegram } from '../../hooks/useTelegram';

const TimesheetList = () => {
    const { tg } = useTelegram();
    const [searchParams] = useSearchParams();
    const [timesheetList, setTimesheetList] = useState([]);
    const [selectedTimesheets, setSelectedTimesheets] = useState([]);
    const [date, setDate] = useState(undefined);

    useEffect(() => {
        tg.ready();
        tg.MainButton.setParams({
            text: 'Отправить'
        });
    }, [tg]);

    useEffect(() => {
        if (selectedTimesheets.length > 0) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }, [tg, selectedTimesheets]);

    function base64ToBytes(base64) {
        const binString = atob(base64);
        return Uint8Array.from(binString, (m) => m.codePointAt(0));
      }

    useEffect(() => {
        let timesheetsJson = new TextDecoder().decode(base64ToBytes(searchParams.get("data")));
        let data = JSON.parse(timesheetsJson);
        setDate(data.date);
        setTimesheetList(data.timesheets);
    }, [searchParams]);

    const handleCheckboxChange = (timesheet) => {
        setSelectedTimesheets(prevSelected => {
            if (prevSelected.includes(timesheet)) {
                return prevSelected.filter(item => item !== timesheet);
            } else {
                return [...prevSelected, timesheet];
            }
        });
    };

    useEffect(() => {
        const confirmAndSendData = () => {
            const isConfirmed = window.confirm('Вы уверены, что хотите удалить выбранные списания времени?');
            if (isConfirmed) {
                tg.sendData(JSON.stringify(selectedTimesheets));
                setSelectedTimesheets([]);
            }
        };

        tg.onEvent('mainButtonClicked', confirmAndSendData);
        
        return () => {
            tg.offEvent('mainButtonClicked', confirmAndSendData);
        };
    }, [tg, selectedTimesheets]);

    return (
        <div className='timesheet_list'>
            <div className='timesheet_heder'>
                Списания времени за <b>{date}</b>
            </div>
            {timesheetList.map(item => (
                <TimesheetItem
                    timesheet={item}
                    isChecked={selectedTimesheets.includes(item)}
                    handleCheckboxChange={() => handleCheckboxChange(item)}
                />
            ))}
        </div>
    );
};

export default TimesheetList;