import React, { useState } from 'react';
import { Row, Button, Form, Container, Card, Col, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/userContext';

const Register = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success'); 
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const validationSchema = Yup.object({
    name: Yup.string().required('* Required'),
    email: Yup.string().email('Invalid email address').required('* Required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('* Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validationSchema,
    // Handle form submission
    onSubmit: (values, onSubmitProps) => {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = existingUsers.find(user => user.email === values.email);

      if (userExists) {
        
        setAlertMessage('User already exists!');
        setAlertVariant('danger');
        onSubmitProps.setSubmitting(false);
      } else {
        
        existingUsers.push(values);
        localStorage.setItem('users', JSON.stringify(existingUsers));
       
        setAlertMessage('Registration successful!');
        setAlertVariant('success');
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        
        login(values);

        setTimeout(() => {
          navigate('/login'); 
        }, 1000); 
      }
    },
  });

  return (
    <>
      <Container
        fluid
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Col xs={6}>
          <Card style={{ padding: '25px' }}>
            <h5 className="text-center">User Registration</h5>
            {/* Display the alert message if there is any */}
            {alertMessage && (
              <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
                {alertMessage}
              </Alert>
            )}
            <Form role="form" onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                />
                {formik.touched.name && formik.errors.name && (
                  <Form.Text className="text-danger">{formik.errors.name}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email && (
                  <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                />
                {formik.touched.password && formik.errors.password && (
                  <Form.Text className="text-danger">{formik.errors.password}</Form.Text>
                )}
              </Form.Group>

              <Row className="justify-content-center">
                <Button variant="primary" type="submit" style={{ width: '50%' }}>
                  Submit
                </Button>
              </Row>
            </Form>
            <div className='mb-3 mt-3 text-center'>Already registered? <a href='/login'>Log in</a></div>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Register;