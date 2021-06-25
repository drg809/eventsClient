import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validations';
import { singInApi, setTokenApi } from '../../api/auth';


import './SignInForm.scss';

export default function SignInForm(props) {
   const { setRefreshCheckLogin } = props;
   const [formData, setFormData] = useState(initialFormValue());
   const [signInLoading, setSignInLoading] = useState(false)

   const onSubmit = e => {
      e.preventDefault();
      console.log(formData);
      let validCount = 0;
      values(formData).some(value => {
         value && validCount++
         return null;
      });

      if (validCount !== size(formData)) {
         toast.warning('Debe completar todos los campos del formulario.');
      } else {
         if (!isValidEmail(formData.email)) {
            toast.warning('El email no es válido.');     
         } else {
            setSignInLoading(true);
            singInApi(formData).then(response => {
               if (response.message) {
                  toast.warning(response.message);
               } else {
                  setTokenApi(response.token);
                  setRefreshCheckLogin(true);
               }
            }).catch(() => {
               toast.error('Error del servidor, inténtelo más tarde.')
            })
            .finally(() => {
               setSignInLoading(false);
            })
         }
      }
   }

   const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   return (
      <div className="sign-in-form">
         <h2>Entrar</h2>
         <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group>
               <Form.Control type="email" name="email" placeholder="Correo electrónico" defaultValue={formData.email} />
            </Form.Group>
            <Form.Group>
               <Form.Control type="password" name="password" placeholder="Constraseña" defaultValue={formData.password} />
            </Form.Group>
            <Button variant="primary" type="submit">
               {!signInLoading ? 'Iniciar sesión' : <Spinner animation="border" /> }
            </Button>
         </Form>
      </div>
   )
}

function initialFormValue() {
   return {
      email: "",
      password: ""
   }
}
