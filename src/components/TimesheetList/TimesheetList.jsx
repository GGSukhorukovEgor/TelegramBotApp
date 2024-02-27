import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TimesheetItem from '../TimesheetItem/TimesheetItem';
import './TimesheetList.css';
import { useTelegram } from '../../hooks/useTelegram';

const TimesheetList = () => {
    const { tg } = useTelegram();
    const [searchParams, setSearchParams] = useSearchParams();
    const [timesheetList, setTimesheetList] = useState(undefined);
    const [selectedTimesheet, setSelectedTimesheet] = useState(null);

    useEffect(() => {
        let timesheetsJson = atob(searchParams.get("data"));
        setTimesheetList(JSON.parse(timesheetsJson));
    }, [setTimesheetList, setSearchParams, searchParams]);

    const confirmAndSendData = (timesheet) => {
        const isConfirmed = window.confirm('Вы уверены, что хотиде удалить timesheet?');

        if (isConfirmed) {
            tg.sendData(JSON.stringify(timesheet));
        }
    };

    const onSelect = (timesheet) => {
        setSelectedTimesheet(timesheet);
    };

    useEffect(() => {
        if (selectedTimesheet) {
            confirmAndSendData(selectedTimesheet);
            setSelectedTimesheet(null); // Reset selectedTimesheet after sending data
        }
    }, [selectedTimesheet]);

    return (
        <div className='timesheet_list'>
            {timesheetList && timesheetList.map(item => (
                <TimesheetItem
                    key={item.id}
                    timesheet={item}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default TimesheetList;