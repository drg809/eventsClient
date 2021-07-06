import React from 'react';
import { Modal } from 'react-bootstrap';
import { CloseIcon } from '../../../../utils/Icons';

import './ParticipateModal.scss';

export default function ParticipateModal(props) {
   const { show, setShowModal, title, children } = props;
   console.log(props);
   return (
      <Modal className='participate-modal' show={show} onHide={() => setShowModal(false)} centered size='lg' >
         <Modal.Header>
            <Modal.Title>
               <CloseIcon onClick={() => setShowModal(false)} />
               <h2>{title}</h2>
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           {children}
         </Modal.Body>
      </Modal>
   );
}
