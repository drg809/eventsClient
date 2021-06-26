import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { CloseIcon } from '../../../utils/Icons';

import './EventsModal.scss';

export default function EventsModal(props) {
   const { show, setShow } = props;

   const onSubmit = () => {

   };

   return (
      <Modal className='events-modal' show={show} onHide={() => setShow(false)} centered size='lg' >
         <Modal.Header>
            <Modal.Title>
               <CloseIcon onClick={() => setShow(false)} />
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={onSubmit}>
               <Form.Control as='textArea' row={6} placeholder='Descripción del evento' />
               <Button type='submit'>Guardar</Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
}
