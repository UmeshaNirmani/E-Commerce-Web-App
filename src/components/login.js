import React, { useState } from 'react';
import { Row, Button, Form, Container, Card, Col, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success'); 
  const navigate = useNavigate(); 

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('* Required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('* Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,
    onSubmit: (values, onSubmitProps) => {

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = existingUsers.find(
        (user) => user.email === values.email && user.password === values.password
      );

      if (user) {

        setAlertMessage('Login successful!');
        setAlertVariant('success');
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();

        setTimeout(() => {
          navigate('/'); 
        }, 1000); 
      } else {

        setAlertMessage('Invalid email or password');
        setAlertVariant('danger');
        onSubmitProps.setSubmitting(false);
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
            <h5 className="text-center">User Login</h5>
            {/* Display the alert message if there is any */}
            {alertMessage && (
              <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
                {alertMessage}
              </Alert>
            )}
            <Form role="form" onSubmit={formik.handleSubmit}>
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

              <Row className="justify-content-md-center">
                <Button variant="primary" type="submit" style={{ width: '50%' }}>
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Login;