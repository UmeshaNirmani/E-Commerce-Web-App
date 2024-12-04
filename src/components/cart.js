import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { Button } from 'react-bootstrap';

const Cart = (product) => {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); 

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);  

  const handleCheckout = () => {
    const isAuthenticated = !!localStorage.getItem('authenticatedUser');
    if (isAuthenticated) {
      navigate('/checkout'); 
    } else {
      navigate('/login', { state: { from: '/checkout' } }); 
    }
  };

  return (
    <div>
      <h1><FiShoppingCart /></h1>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Button onClick={() => navigate('/')}>Return to Products</Button>
        </div>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price}
              </li>
            ))}
          </ul>
          <Button onClick={handleCheckout}>Proceed to Checkout</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;