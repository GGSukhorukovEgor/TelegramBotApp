import React from 'react';
import './TimesheetItem.css';

const TimesheetItem = ({timesheet, onSelect}) => {

    const onSelectHendler = () => {
        onSelect(timesheet);
    }

    return(
        <div className='timesheet_item'>
            <div className='timesheet_duration'>Кол-во часов: <b>{timesheet.duration}</b></div>
            <div className='timesheet_projectName'>Проект: <b>{timesheet.projectName}</b></div>
            <div className='timesheet_description'>Описание: <b>{timesheet.description}</b></div>
            <button className='select-btn' onClick={onSelectHendler}>
                Выбрать
            </button>
        </div>
    )
}

export default TimesheetItem;