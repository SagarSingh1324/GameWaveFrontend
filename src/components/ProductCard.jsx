import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constants';
import Rating from './Rating';
import './CSS/ProductCard.css'; 

const ProductCard = ({ product }) => {
  return (
    <Card className='product-card'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={BASE_URL + '/api' + product.image}
          variant='top'
          className='product-image'
        />
      </Link>

      <Card.Body className='product-body'>
          <Card.Title as='div' className='product-title'>
            {product.name}
          </Card.Title>

        <Card.Text className='product-rating'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='div' className='product-brand'>
          {product.brand} 
        </Card.Text>

        <Card.Text as='div' className='product-category'>
          {product.category} 
        </Card.Text>
        
        <Card.Text as='h3' className='product-price'>
          ₹{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
