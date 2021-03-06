import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';

import BasicModal from '../../components/Modal/BasicModal/BasicModal';
import SignUpForm from '../../components/SignUpForm';
import SignInForm from '../../components/SignInForm';
import LogoWhiteEvents from '../../assets/png/logo-white.png';
import LogoEvents from '../../assets/png/logo.png';

import './SignInSingUp.scss';

export default function SignInSingUp(props) {
   const { setRefreshCheckLogin } = props;
   const [showModal, setShowModal] = useState(false);
   const [contentModal, setContentModal] = useState(null);

   const openModal = content => {
      setShowModal(true);
      setContentModal(content);
   }

   return (
      <>
         <Container className='signin-signup' fluid>
            <Row>
               <LeftComponent />
               <RightComponent openModal={openModal} setShowModal={setShowModal} setRefreshCheckLogin={setRefreshCheckLogin} />
            </Row>
         </Container>
         <BasicModal show={showModal} setShow={setShowModal}>
            {contentModal}
         </BasicModal>
      </>
   );
}

function LeftComponent() {
   return (
      <Col className='signin-signup__left' xs={6}>
         <img src={LogoEvents} alt='events'/>
         <div>
            <h2>
               <FontAwesomeIcon icon={faUsers} />
               Participa en eventos de Don Bosco.
            </h2>
            <h2>
               <FontAwesomeIcon icon={faComment} />
               ┬íParticipa en la comunidad de Don Bosco!
            </h2>
            <h2>
               <FontAwesomeIcon icon={faSearch} />
               Sigue los grupos que te interesen
            </h2>
         </div>
      </Col>
   );
}

function RightComponent(props) {
   const { openModal, setShowModal, setRefreshCheckLogin } = props;

   return (
      <Col className='signin-signup__right'>
         <div>
            <img src={LogoWhiteEvents} alt='events'/>
            <h2>Mira las actividades de Don Bosco.</h2>
            <h3>├Ünete a la comunidad de Don Bosco hoy mismo.</h3>
            <Button onClick={ () => openModal(<SignUpForm setShowModal={setShowModal} />) } variant='primary'>
               Reg├şstrate
            </Button>
            <Button onClick={ () => openModal(<SignInForm setRefreshCheckLogin={setRefreshCheckLogin}  />) } variant='outline-primary'>
               Iniciar sesion
            </Button>
         </div>
      </Col>
   );
}