import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("/market")
      .then(res => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);
  return (
    <h1>Hello1</h1>
  );
}

export default App;
