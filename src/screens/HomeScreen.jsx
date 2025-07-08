import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice'; 
import ProductCard from '../components/ProductCard';
import './CSS/HomeScreen.css'; // <-- Import custom styles

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="home-screen">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div className="error-message">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <>
          <h1 className="section-title">Latest Products</h1>
          <Row className="products-row">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
