import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getUserApi } from '../../api/user';
import BasicLayout from '../../layout/BasicLayout/BasicLayout'
import './User.scss';

function User(props) {
   const { match } = props;
   const { params } = match;
   const [user, setUser] = useState(null);

   useEffect(() => {
      getUserApi(params.id).then(response => {
         if (!response) toast.error('El usuario que has visitado no existe.');
         setUser(response);
      }).catch(() => {
         toast.error('El usuario que has visitado no existe.');
      })
   }, [params]);
   
   return (
      <BasicLayout className="user">
         <div className="user__title">
            <h2> {user ? `${user.name} ${user.surname}` : 'El usuario no existe' } </h2>
         </div>
         <div>Banner Usuario</div>
         <div>Info usuario</div>
         <div className="user__events">Lista de eventos</div>
      </BasicLayout>
   );
}

export default withRouter(User);