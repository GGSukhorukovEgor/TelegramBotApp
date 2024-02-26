import {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import TimesheetItem from '../TimesheetItem/TimesheetItem'
import './TimesheetList.css';

const TimesheetList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [timesheetList, setTimesheetList] = useState(undefined);

    useEffect(() => {
        let timesheetsJson = atob(searchParams.get("data"));
        setTimesheetList(JSON.parse(timesheetsJson));
        }, [setTimesheetList]);

    const onSelect = (timesheet) => {
        console.log(timesheet);
    }

    return(
        <div className='timesheet_list'>
            {timesheetList && timesheetList.map(item => (
                <TimesheetItem 
                    timesheet={item} 
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
}

export default TimesheetList;