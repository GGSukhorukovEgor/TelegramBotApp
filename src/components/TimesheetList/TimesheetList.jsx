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

    useEffect(() => {
        let timesheetsJson = decodeURIComponent(searchParams.get("data"), 'utf-8');

        setTimesheetList(JSON.parse(timesheetsJson));
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
            const isConfirmed = window.confirm('Вы уверены, что хотите удалить выбранные timesheets?');
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
            {timesheetList.map(item => (
                <TimesheetItem
                    key={item.id}
                    timesheet={item}
                    isChecked={selectedTimesheets.includes(item)}
                    handleCheckboxChange={() => handleCheckboxChange(item)}
                />
            ))}
        </div>
    );
};

export default TimesheetList;