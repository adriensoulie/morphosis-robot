import React, {useState, useEffect} from 'react';
// Material UI Components
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Robot from './components/Robot';
import Cart from './components/Cart';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';


function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartRobots, setCartRobots] = useState([]);
  const [loaded, setIsLoaded] = useState(false);
  const [robots, setRobots] = useState([]);
  const [error, setError] = useState(null);
  const [robotMaterial, setRobotMaterial] = React.useState('All');

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

  const handleAddToCart = ( clickedRobot ) => {

    cartRobots.length > 4 ? 
      alert("You Can Only Have 5 Differents Robots in Cart Not More !")
    : 
      setCartRobots(prev => {
        const isRobotInCart = prev.find(robot => robot.name === clickedRobot.name);
        if (isRobotInCart) {
          return prev.map(robot =>
            robot.name === clickedRobot.name
              ? { ...robot, amount: robot.amount + 1, stock: robot.stock - 1 }
              : robot
          );
        }
        return [...prev, { ...clickedRobot, amount: 1}];
      });

      setRobots(
        prev => {
            return { data: prev.data.map(robot => 
              robot.name === clickedRobot.name 
              ? {...robot, stock: robot.stock - 1}
              : robot
            )}
          }
      )
  };

  const getTotalRobots = ( robots ) =>
  robots.reduce((ack, robot) => ack + robot.amount, 0);

  const handleRemoveFromCart = ( name ) => {
    setCartRobots(prev =>
      prev.reduce((ack, robot) => {
        if (robot.name === name) {
          if (robot.amount === 1) return ack;
          return [...ack, { ...robot, amount: robot.amount - 1, stock: robot.stock + 1 }];
        } else {
          return [...ack, robot];
        }
      }, [])
    );

    setRobots(
      prev => {
          return { data: prev.data.map(robot => {
            if (robot.name === name){
              return  {...robot, stock: robot.stock + 1}
            } else {
              return robot
            }
          })}
        }
    )
  };

  const handleChange = (event) => {
    setRobotMaterial(event.target.value);
  };

  const selectedRobots  = robots.data && robots.data.filter( robot => robot.material ===  robotMaterial);

  
  return (
    <div className="App">
      <div style={{
        textAlign: 'center',
      }}>
        <h1>Robot Market</h1>
        <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            value={robotMaterial}
            onChange={handleChange}
            input={<Input />}
          >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={'Granite'}>Granite</MenuItem>
            <MenuItem value={'Metal'}>Metal</MenuItem>
            <MenuItem value={'Fresh'}>Fresh</MenuItem>
            <MenuItem value={'Wooden'}>Wooden</MenuItem>
            <MenuItem value={'Rubber'}>Rubber</MenuItem>
            <MenuItem value={'Steel'}>Steel</MenuItem>
            <MenuItem value={'Cotton'}>Cotton</MenuItem>
            <MenuItem value={'Soft'}>Soft</MenuItem>
            <MenuItem value={'Frozen'}>Frozen</MenuItem>
            <MenuItem value={'Plastic'}>Plastic</MenuItem>
        </Select>
      </div>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart 
          cartRobots={cartRobots}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <div onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalRobots(cartRobots)} color='error'
          style={{
            position: 'fixed',
            zIndex: '100',
            right: '20px',
            top: '20px',
          }}
        >
          <AddShoppingCartIcon />
        </Badge>
      </div>

      <Container style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '30px',
      }}> 
        <>
        { robotMaterial === 'All' ? 
          robots.data && robots.data.map(robot => {
            return <Robot key={robot.name} robot={robot}  handleAddToCart={handleAddToCart}/>
          })
          :
          robotMaterial && selectedRobots.map(robot => {
            return <Robot key={robot.name} robot={robot}  handleAddToCart={handleAddToCart}/>
          })
        }
        </>
      </Container>

    </div>
  );
}

export default App;
