import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Card, Container, Col, Row, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/userContext'; 

const Cart = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  // Increase the quantity of a cart item
  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Decrease the quantity of a cart item
  const handleDecrease = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

   // Remove an item from the cart
  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Handle the checkout process
  const handleCheckout = () => {
    if (!currentUser) {
      setShowLoginMessage(true);
    } else {
      setCartItems([]);
      localStorage.removeItem('cartItems');
      navigate('/cart');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container fluid style={{ maxWidth: '600px', marginTop: '50px', marginBottom: '50px' }}>
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {/* Display login message if user is not logged in */}
      {showLoginMessage && (
        <Alert variant="danger" onClose={() => setShowLoginMessage(false)} dismissible>
          Please log in to proceed to checkout.
        </Alert>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Return to Products
          </Button>
        </div>
      ) : (
        <>
          <div>
            {cartItems.map((item, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col xs={3}>
                      <Card.Img
                        src={item.image}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                    <Col xs={6}>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {item.quantity} × {parseFloat(item.price).toFixed(2)} LKR
                      </Card.Text>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleDecrease(index)}
                          style={{ marginRight: '5px' }}
                        >
                          -
                        </Button>
                        <div>{item.quantity}</div>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleIncrease(index)}
                          style={{ marginLeft: '5px' }}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end align-items-start">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="text-center mt-4">
            <h4>Subtotal: {parseFloat(calculateSubtotal()).toFixed(2)} LKR</h4>
            <Row>
              <Col xs={6}>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => navigate('/')}
                  style={{ width: '100%' }}
                >
                  Shop more
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={handleCheckout}
                  style={{ width: '100%' }}
                >
                  Checkout
                </Button>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;