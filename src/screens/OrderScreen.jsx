import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';

import './CSS/OrderScreen.css'; 

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const payHandler = async () => {
    try {
      await payOrder({
        orderId,
        details: {
          id: `DEMO-${Date.now()}`,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: userInfo.email,
          paymentMethod: order.paymentMethod || 'DEMO',
        },
      }).unwrap();
      toast.success('Order marked as paid');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="order-screen">
      <h1 className="order-title">Order #{order._id}</h1>
      <Row className="gy-4">
        <Col md={8}>
          <ListGroup variant="flush" className="order-details">
            <ListGroup.Item className="order-section">
              <h2>Shipping</h2>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="order-section">
              <h2>Payment Method</h2>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className="order-section">
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} className="order-item">
                      <Row className="align-items-center">
                        <Col>
                          <Link to={`/product/${item.product}`} className="order-item-name">
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="order-summary-card">
            <ListGroup variant="flush">
              <ListGroup.Item className="summary-header">
                <h2 className="summary-title">Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item className="summary-row">
                <Row>
                  <Col>Items</Col>
                  <Col className="text-end">₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="summary-row">
                <Row>
                  <Col>Shipping</Col>
                  <Col className="text-end">₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="summary-row">
                <Row>
                  <Col>Tax</Col>
                  <Col className="text-end">₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="summary-total">
                <Row>
                  <Col><strong>Total</strong></Col>
                  <Col className="text-end"><strong>₹{order.totalPrice}</strong></Col>
                </Row>
              </ListGroup.Item>

              {/* {!order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={payHandler}
                    disabled={loadingPay}
                  >
                    Mark as Paid
                  </Button>
                  {loadingPay && <Loader />}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />} */}

              {/* {userInfo?.isAdmin && order.isPaid (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )} */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;

