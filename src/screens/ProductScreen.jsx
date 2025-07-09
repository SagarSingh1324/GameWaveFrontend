import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart } from '../slices/cartSlice';
import { BASE_URL } from '../constants';
import './CSS/ProductScreen.css'; 

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className="product-screen">
      <Link className="btn btn-light back-button" to="/">
        ← Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row className="product-details">
            <Col md={6}>
              <Image
                className="product-image"
                src={BASE_URL + '/api' + product.image}
                alt={product.name}
                fluid
              />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush" className="product-info">
                <ListGroup.Item>
                  <h2 className="product-name">{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item className="product-price">
                  Price: ₹{product.price}
                </ListGroup.Item>
                <ListGroup.Item className="product-description">
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card className="purchase-card">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? 'In Stock'
                          : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) =>
                              setQty(Number(e.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn btn-dark w-100"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
