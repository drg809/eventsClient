import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import useAuth from '../../hooks/useAuth';
import { getUserApi } from '../../api/user';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import BannerAvatar from '../../components/User/BannerAvatar/BannerAvatar';
import InfoUser from '../../components/User/InfoUser/InfoUser';
import './User.scss';

function User(props) {
   const { match } = props;
   const { params } = match;
   const [user, setUser] = useState(null);
   const loggedUser = useAuth();

   useEffect(() => {
      getUserApi(params.id).then(response => {
         if (!response) toast.error('El usuario que has visitado no existe.');
         setUser(response);
      }).catch(() => {
         toast.error('El usuario que has visitado no existe.');
      })
   }, [params]);
   
   return (
      <BasicLayout className='user'>
         <div className='user__title'>
            <h2> {user ? `${user.name} ${user.surname}` : 'El usuario no existe' } </h2>
         </div>
         <BannerAvatar user={user} loggedUser={loggedUser} />
         <InfoUser user={user} />
         <div className='user__events'>Lista de eventos</div>
      </BasicLayout>
   );
}

export default withRouter(User);