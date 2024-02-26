import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import SelectDate from './components/SelectDate/SelectDate';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={'selectDate'} element={<SelectDate />} />
      </Routes>
    </div>
  );
}

export default App;