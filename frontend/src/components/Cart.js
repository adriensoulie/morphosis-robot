import { Container } from "@material-ui/core";
import CartRobot from '../components/CartRobot';

const Cart= ({ cartRobots, addToCart, removeFromCart }) => {

    const calculateTotalAmount = ( robots ) => 
      robots.reduce((ack, robot) => ack + robot.amount, 0);

    const calculateTotal = (robots) =>
      robots.reduce((ack, robot) => ack + robot.amount * robot.price, 0);

  
    return (
      <Container>
        <h2>Your Shopping Cart</h2>
        {cartRobots.length === 0 ? <p>You didn't add any Robot yet !</p> : null}
        {cartRobots.map(robot => (
          <CartRobot
            key={robot.name}
            robot={robot}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h2>Total Amount: {calculateTotalAmount(cartRobots)}</h2>
        <h2>Total Price: ฿{calculateTotal(cartRobots).toFixed(2)}</h2>
      </Container>
    );
};


export default Cart 