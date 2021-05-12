
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


const Robot = ({ robot, handleAddToCart }) => {  

    const dateConverter = ( creationDate ) => {
        return creationDate.slice(0,10)
    }

    return ( 
        <Card style={{
            margin: '10px',
            padding: '10px',
            width: '200px',
            textAlign: 'center',
        }}>
            <CardMedia
                image={robot.image}
                title={robot.name}
            />
            <img src={robot.image} alt={robot.name} />
            <div>
            <h3>{robot.name}</h3>
            <p>{robot.material}</p>
            <h3>฿{robot.price}</h3>
            {robot.stock === 0 ? <p style={{color: 'red'}}>Out of stock</p>: <p>Stock: {robot.stock}</p> }
            <p>Created: {dateConverter(robot.createdAt)}</p>
            </div>
            {robot.stock !== 0 ? <Button onClick={() => handleAddToCart(robot)}>Add to cart</Button> : null }
        </Card>
  )
};

export default Robot;