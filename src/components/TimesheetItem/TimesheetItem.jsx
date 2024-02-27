import './TimesheetItem.css';

const TimesheetItem = ({ timesheet, isChecked, handleCheckboxChange }) => {
    return (
        <div className='timesheet_item'>
            <div className='timesheet_duration'>Кол-во часов: <b>{timesheet.duration}</b></div>
            <div className='timesheet_projectName'>Проект: <b>{timesheet.projectName}</b></div>
            <div className='timesheet_description'>Описание: <b>{timesheet.description}</b></div>
            <input
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
        </div>
    );
}

export default TimesheetItem;