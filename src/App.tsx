import React, { useEffect, useState } from 'react';
import './App.css';
import implicitFlow from './api/vkAuth';

function App() {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    if (localStorage.getItem('token')) setToken(localStorage.getItem('token'))
    else {
      implicitFlow().then((value) => {
        setToken(value)
        if (value.state === 'ok') localStorage.setItem('token', value.payload)
      })
    }
    console.log(token)
  }, [token])

  return (
    <div className="App">
    </div>
  );
}

export default App;
