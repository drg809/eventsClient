import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validations';
import { signUpApi } from '../../api/auth';
 
import './SignUpForm.scss';

export default function SignUpForm(props) {
   const { setShowModal } = props;
   const [formData, setFormData] = useState(initialFormValue());
   const [signUpLoading, setSignUpLoading] = useState(false)

   const onSubmit = e => {
      e.preventDefault();
      //setShowModal(false);

      let validCount = 0;
      values(formData).some(value => {
         console.log(value)
         value && validCount++
         return null
      });

      if ( validCount !== size(formData) ) {
         toast.warning('Completa todos los campos del formulario.');
      } else{
         if (!isValidEmail(formData.email)) {
            toast.warning('El email no es válido.');
         } else if (formData.password !== formData.repeatPassword) {
            toast.warning('Las contraseñas tienen que ser iguales');
         } else if (size(formData.password) < 8) {
            toast.warning('La contraseña tienen que tener al menos 8 caracteres.');
         } else {
            setSignUpLoading(true);
            signUpApi(formData).then(response => {
               if (response.code) {
                  toast.warning(response.message)
               } else {
                  toast.success('El registro ha sido correcto');
                  setShowModal(false);
                  setFormData(initialFormValue())
               }
            })
            .catch(() => {
               toast.error('Error del servidor, inténtelo más tarde.');
            })
            .finally(() => {
               setSignUpLoading(false);
            })
         }
      }
   };

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

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
               <Form.Control name="email" type='email' placeholder='Correo electrónico' defaultValue={formData.email} />
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
               { !signUpLoading ? "Registrarse" : <Spinner animation="border"/> }
            </Button>
         </Form>
      </div>
   );
};

function initialFormValue() {
   return {
      name: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: '',
   };
};