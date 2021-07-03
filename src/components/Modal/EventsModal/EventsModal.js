import React from 'react';
import { Modal } from 'react-bootstrap';
import { CloseIcon } from '../../../utils/Icons';

import './EventsModal.scss';

export default function EventsModal(props) {
   const { show, setShow, children } = props;

   return (
      <Modal className='events-modal' show={show} onHide={() => setShow(false)} centered size='lg' >
         <Modal.Header>
            <Modal.Title>
               <CloseIcon onClick={() => setShow(false)} />
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           {children}
         </Modal.Body>
      </Modal>
   );
}
