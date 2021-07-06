import React from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';


export default function ParticipateForm(props) {
   const { loggedUser, user, setShowModal } = props;
   console.log(props);

   return (
      <div className='participate-form'>
         <p>Pulsa 'continuar' para confirmar la participación en el evento. Puedes introducir una nota para los organizadores del evento.</p>
         <Form>

         </Form>
      </div>
   );
}
