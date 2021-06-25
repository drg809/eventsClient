import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

import BasicLayout from '../../layout/BasicLayout/BasicLayout'
import './User.scss';

export default function User() {
   return (
      <BasicLayout className="user">
         <div className="user__title">
            <h2>Usuario</h2>
         </div>
         <div>Banner Usuario</div>
         <div>Info usuario</div>
         <div className="user__events">Lista de eventos</div>
      </BasicLayout>
   );
}
