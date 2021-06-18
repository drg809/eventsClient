import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';

import './SignUpForm.scss';

export default function SignUpForm(props) {
   const { setShowModal } = props;
   const [formData, setFormData] = useState(initialFormValue());

   const onSubmit = e => {
      e.preventDefault();
      setShowModal(false);
   }

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   }

   return (
      <div className='sign-up-form'>
         <h2>Crea tu cuenta</h2>
         <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control name="name" type='text' placeholder='Nombre' defaultValue={formData.name} />
                  </Col>
                  <Col>
                     <Form.Control name="surname" type='text' placeholder='Apellidos' defaultValue={formData.surname} />
                  </Col>
               </Row>
            </Form.Group>
            <Form.Group>
               <Form.Control name="name" type='email' placeholder='Correo electrónico' defaultValue={formData.email} />
            </Form.Group>
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control name="password" type='password' placeholder='Contraseña' defaultValue={formData.password} />
                  </Col>
                  <Col>
                     <Form.Control name="repeatPassword" type='password' placeholder='Repetir contraseña' defaultValue={formData.repeatPassword} />
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

function initialFormValue() {
   return {
      name: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: '',
   };
}