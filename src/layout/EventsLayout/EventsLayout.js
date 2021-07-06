import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftMenu from '../../components/LeftMenu/LeftMenu';

import './EventsLayout.scss';

export default function EventsLayout(props) {
   const { className, setRefreshCheckLogin, children } = props;

   return (
      <Container className={`events-layout ${className}`}>
         <Row>
            <Col xs={3} className='events-layout__menu'>
               <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin} />
            </Col>
            <Col xs={9} className='events-layout__content'>
               {children}
            </Col>
         </Row>
      </Container>
   );
}
