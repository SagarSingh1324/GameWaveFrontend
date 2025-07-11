import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { BASE_URL } from '../constants';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import './CSS/ProductCarousel.css';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  console.log(products);
  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' interval={2000} className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={BASE_URL + '/api' + product.image}
              alt={product.name}
              fluid
              className="carousel-image"
            />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
