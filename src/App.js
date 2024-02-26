import React, { } from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import SelectDate from './components/SelectDate/SelectDate';
import TimesheetList from './components/TimesheetList/TimesheetList';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={'selectDate'} element={<SelectDate />} />
        <Route path={'selectTimesheet'} element={<TimesheetList />} />
      </Routes>
    </div>
  );
}

export default App;