
import Button from '@material-ui/core/Button';


const Robot = ({ robot, handleAddToCart }) => (
  <div>
    <img src={robot.image} alt={robot.name} />
    <div>
      <h3>{robot.name}</h3>
      <p>{robot.material}</p>
      <h3>${robot.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(robot)}>Add to cart</Button>
  </div>
);

export default Robot;