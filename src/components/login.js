import React from 'react';
import { Row, Button, Form, Container, Card, Col} from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("* Required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("* Required"),
  });
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema, 
    onSubmit: (values, onSubmitProps) => {
      console.log(JSON.stringify(values, null, 2));
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });

  return (  
    <>
    <Container fluid   
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
      <Col xs={6}>
        <Card style={{ padding: '25px'}}>
          <h5 className='text-center'>User Login</h5>
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
                  <Form.Text className="text-danger">
                    {formik.errors.email}
                  </Form.Text>
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
                  <Form.Text className="text-danger">
                    {formik.errors.password}
                  </Form.Text>
              )}
            </Form.Group>            
            <Row className="justify-content-md-center">
            <Button variant="primary" type="submit" style={{ width: '50%' }} >
              Submit
            </Button>
            </Row>
          </Form> 
        </Card> 
      </Col>
    </Container>  
    </>      
  );
}

export default Login;