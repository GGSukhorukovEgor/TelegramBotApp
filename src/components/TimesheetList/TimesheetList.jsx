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

        const confirmAndSendData = (timesheet) => {
            const isConfirmed = window.confirm('Вы уверены, что хотитек удалить timesheet?');

            if (isConfirmed) {
                tg.sendData(JSON.stringify(timesheet));
            }
        };

        if (selectedTimesheet) {
            confirmAndSendData(selectedTimesheet);
            setSelectedTimesheet(null);
        }
    }, [setTimesheetList, setSearchParams, searchParams, tg, selectedTimesheet]);

    const onSelect = (timesheet) => {
        setSelectedTimesheet(timesheet);
    };

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