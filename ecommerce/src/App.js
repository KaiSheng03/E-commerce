import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Market from './Market';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("/market")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);
  return (
    <h1>Hello</h1>
  );
}

export default App;
