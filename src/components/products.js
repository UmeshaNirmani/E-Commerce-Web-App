import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Spinner, Navbar, Nav, Form, Badge } from 'react-bootstrap';
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Products = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/assets/data.json');
      if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Initialize cart count from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const initialCount = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(initialCount);
  }, []);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }

    // Update cart count
    const newCount = existingCart.reduce((acc, item) => acc + item.quantity, 1);
    setCartCount(newCount);
  };

  if (loading)
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" size="md" />
      </Row>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/cart">
                <FiShoppingCart />
                {cartCount > 0 && (
                  <Badge bg="danger" className="ms-1">{cartCount}</Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" variant="outline-dark">
                  <IoSearchOutline />
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
      <Row className="mt-5 mb-3">
        <h1 className="text-center">Our Products</h1>
      </Row>
      <Row>
        {data.map((request, index) => (
          <Col key={index} md={4} className="mb-4">
            {request && (
              <Card>
                <Card.Body>
                  <Card.Img variant="top" src={request.image} />
                  <Card.Title>{request.name}</Card.Title>
                  <Card.Text>{request.description}</Card.Text>
                  <Card.Title>{request.category}</Card.Title>
                  <Card.Text>LKR {request.price}</Card.Text>
                  <Row className="justify-content-center">
                    <Button
                      variant="primary"
                      style={{ width: '50%' }}
                      onClick={() => addToCart(request)}
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
