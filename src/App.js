import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import {Route, Routers} from 'react-router-dom';
import SelectDate from './components/SelectDate/SelectDate';

function App() {

  return (
    <div className="App">
      <Routers>
        <Route path={'selectDate'} element={<SelectDate />} />
      </Routers>
    </div>
  );
}

export default App;