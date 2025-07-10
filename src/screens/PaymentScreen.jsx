import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';
import './CSS/PaymentScreen.css'; 

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <div className="payment-screen-container">
        <CheckoutSteps step1 step2 step3 />
        <h1 className="payment-title">Select Payment Method</h1>

        <Form onSubmit={submitHandler} className="payment-form">
          <Form.Group>
            <Form.Label as='legend' className="form-label">Available Methods</Form.Label>
            <Col>
              <div className="payment-option">
                <Form.Check
                  type='radio'
                  label='PayPal'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>

              <div className="payment-option">
                <Form.Check
                  type='radio'
                  label='UPI'
                  id='UPI'
                  name='paymentMethod'
                  value='UPI'
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>

              <div className="payment-option">
                <Form.Check
                  type='radio'
                  label='Cash on Delivery'
                  id='COD'
                  name='paymentMethod'
                  value='Cash on Delivery'
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>

              <div className="payment-option">
                <Form.Check
                  type='radio'
                  label='Credit Card'
                  id='CreditCard'
                  name='paymentMethod'
                  value='Credit Card'
                  checked={paymentMethod === 'Credit Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>

              <div className="payment-option">
                <Form.Check
                  type='radio'
                  label='Debit Card'
                  id='DebitCard'
                  name='paymentMethod'
                  value='Debit Card'
                  checked={paymentMethod === 'Debit Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </Col>
          </Form.Group>

          <Button type='submit' variant='dark' className='modern-btn w-100 mt-4'>
            Continue
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default PaymentScreen;
