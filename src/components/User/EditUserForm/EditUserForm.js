import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';

import './EditUserForm.scss';

export default function EditUserForm() {
   const onSubmit = (e) => {
      e.preventDefault();

   };

   return (
      <div className='edit-user-form'>
         <Form onSubmit={onSubmit} >
            <Form.Group>
               <Row>
                  <Col>
                     <Form.Control type='text' placeholder='Nombre' name='name' ></Form.Control>
                  </Col>
                  <Col>
                     <Form.Control type='text' placeholder='Apellido' name='surname' ></Form.Control>
                  </Col>
               </Row>
            </Form.Group>
            <Form.Group>
               <Form.Control as='textarea' row='3' placeholder='Agrega tu biografía' type='text' name='bio' />
            </Form.Group>
            <Form.Group>
               <Form.Control type='text' placeholder='Sitio web' name='web' />
            </Form.Group>
            <Form.Group>
               <DatePicker placeholder='Fecha de nacimiento' locale={es} selected={new Date()} />
            </Form.Group>

            <Button className='btn-submit' variant='primary'>Actualizar</Button>
         </Form>
      </div>
   );
}
