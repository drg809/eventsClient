import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';
import LogoWhiteEvents from '../../assets/png/logo-white.png';
import LogoEvents from '../../assets/png/logo.png';

import './SignInSingUp.scss';

export default function SignInSingUp() {
   return (
      <Container className="signin-signup" fluid>
         <Row>
            <LeftComponent />
            <RightComponent />
         </Row>
      </Container>
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

function RightComponent() {
   return (
      <Col className="signin-signup__right">
         <div>
            <img src={LogoWhiteEvents} alt="events"/>
            <h2>Mira las actividades de Don Bosco.</h2>
            <h3>Únete a la comunidad de Don Bosco hoy mismo.</h3>
            <Button variant="primary">
               Regístrate
            </Button>
            <Button variant="outline-primary">
               Iniciar sesion
            </Button>
         </div>
      </Col>
   )
}