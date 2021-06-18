import React from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';

import './SignUpForm.scss';

export default function SignUpForm(props) {
   const { setShowModal } = props;

   const onSubmit = e => {
      e.preventDefault();
      setShowModal(false);
   }

   return (
      <div className='sign-up-form'>
         <h2>Crea tu cuenta</h2>
         <Form onSubmit={onSubmit}>
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control type='text' placeholder='Nombre' />
                  </Col>
                  <Col>
                     <Form.Control type='text' placeholder='Apellidos' />
                  </Col>
               </Row>
            </Form.Group>
            <Form.Group>
               <Form.Control type='email' placeholder='Correo electrónico' />
            </Form.Group>
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control type='password' placeholder='Contraseña' />
                  </Col>
                  <Col>
                     <Form.Control type='password' placeholder='Repetir contraseña' />
                  </Col>
               </Row>
            </Form.Group>

            <Button variant='primary' type='submit'>
               Registrarse
            </Button>
         </Form>
      </div>
   )
}
