import React from 'react';
import { Modal } from 'react-bootstrap';

import { CloseIcon } from '../../../utils/Icons';
import './ConfigModal.scss';

export default function ConfigModal(props) {
   const { show, setShow, title, children } = props;

   return (
      <Modal className="config-modal" show={show} onHide={ () => setShow(false) } centered size="lg" >
         <Modal.Header>
            <Modal.Title>
               <CloseIcon onClick={() => setShow(false)} />
               <h2>{title}</h2>
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>{children}</Modal.Body>
      </Modal>
   );
}
