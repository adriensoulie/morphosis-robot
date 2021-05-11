import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const CartRobot = ({ robot, addToCart, removeFromCart }) => { 


  const isOutOfStock = ( robot.stock === 1 ? true : false )

  return ( 
    <Container>
      <div>
        <img src={robot.image} alt={robot.name} />
        <h3>{robot.name}</h3>
        <div>
          <p>Price: ฿{robot.price}</p>
          <p>Total: ฿{(robot.amount * robot.price).toFixed(2)}</p>
          { isOutOfStock ?
            <h4>No more stock</h4> 
            :
             <h4>Stock: {robot.stock - 1} </h4> 
          }
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => removeFromCart(robot.name)}
          >
            -
          </Button>
          <p>{robot.amount}</p>

          <Button
            disabled={isOutOfStock}
            size='small'
            disableElevation
            variant='contained'
            onClick={() => addToCart(robot)}
          >
            +
          </Button>
        </div>
      </div>
    </Container>
  )
};

export default CartRobot;