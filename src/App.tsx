import React, { useEffect, useState } from 'react';
import './App.css';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [rootRes, setRootRes] = useState<string | null>();

  // useEffect(() => {
  //   if (localStorage.getItem('token')) setToken(localStorage.getItem('token'))
  //   else {
  //     implicitFlow().then((value) => {
  //       setToken(value)
  //       if (value.state === 'ok') localStorage.setItem('token', value.payload)
  //     }) 
  //   }
  //   console.log(token)
  // }, [token])

  useEffect(() => {
    const fetchRoot = async () => {
      const fetch_retry = async (url: string, options: object, n: number) : Promise<string> => {
        try {
            return await fetch(url, options).then((res) => res.text()).then((data) => data)
        } catch(err) {
            await sleep(1000);
            if (n === 1) throw err;
            return await fetch_retry(url, options, n - 1);
        }
      };
  
      const x = await fetch_retry("http://localhost:5000", {}, 200);
      console.log(x);
    }

    fetchRoot();
  }, [rootRes])

  return (
    <div className="App">
      {rootRes}
    </div>
  );
}

export default App;
