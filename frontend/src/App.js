import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Robot from './components/Robot';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [robots, setRobots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/robots")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRobots(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  console.log(robots)

  return (
    <div className="App">
      <h1>Robot Market</h1>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        Hello
      </Drawer>

      <Button variant="contained" color="primary" onClick={() => setCartOpen(true)}>
        Hello World
      </Button>
      <div>
        {robots.data.map(robot => (
          <Robot robot={robot}/>
        ))}
      </div>

    </div>
  );
}

export default App;
