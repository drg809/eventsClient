import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';

import BasicModal from '../../components/Modal/BasicModal/BasicModal';
import SignUpForm from '../../components/SignUpForm';
import LogoWhiteEvents from '../../assets/png/logo-white.png';
import LogoEvents from '../../assets/png/logo.png';

import './SignInSingUp.scss';

export default function SignInSingUp() {
   const [showModal, setShowModal] = useState(false);
   const [contentModal, setContentModal] = useState(null);

   const openModal = content => {
      setShowModal(true);
      setContentModal(content);
   }

   return (
      <>
         <Container className="signin-signup" fluid>
            <Row>
               <LeftComponent />
               <RightComponent openModal={openModal} setShowModal={setShowModal} />
            </Row>
         </Container>
         <BasicModal show={showModal} setShow={setShowModal}>
            {contentModal}
         </BasicModal>
      </>
   )
}

function LeftComponent() {
   return (
      <Col className="signin-signup__left" xs={6}>
         <img src={LogoEvents} alt="events"/>
         <div>
            <h2>
               <FontAwesomeIcon icon={faUsers} />
               Participa en eventos de Don Bosco.
            </h2>
            <h2>
               <FontAwesomeIcon icon={faComment} />
               ¡Participa en la comunidad de Don Bosco!
            </h2>
            <h2>
               <FontAwesomeIcon icon={faSearch} />
               Sigue los grupos que te interesen
            </h2>
         </div>
      </Col>
   )
}

function RightComponent(props) {
   const { openModal, setShowModal } = props;

   return (
      <Col className="signin-signup__right">
         <div>
            <img src={LogoWhiteEvents} alt="events"/>
            <h2>Mira las actividades de Don Bosco.</h2>
            <h3>Únete a la comunidad de Don Bosco hoy mismo.</h3>
            <Button onClick={ () => openModal(<SignUpForm setShowModal={setShowModal} />) } variant="primary">
               Regístrate
            </Button>
            <Button onClick={ () => openModal(<h2>Formulario de login</h2>) } variant="outline-primary">
               Iniciar sesion
            </Button>
         </div>
      </Col>
   )
}