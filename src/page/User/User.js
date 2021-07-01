import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import useAuth from '../../hooks/useAuth';
import { getUserApi } from '../../api/user';
import { getUsetEventsApi } from '../../api/event';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import BannerAvatar from '../../components/User/BannerAvatar/BannerAvatar';
import InfoUser from '../../components/User/InfoUser/InfoUser';
import ListEvents from '../../components/Events/ListEvents/ListEvents';
import './User.scss';

function User(props) {
   const { match, setRefreshCheckLogin } = props;
   const { params } = match;
   const [user, setUser] = useState(null);
   const [events, setEvents] = useState(null);
   const [page, setPage] = useState(1);
   const [loadingEvents, setLoadingEvents] = useState(false);
   const loggedUser = useAuth();

   useEffect(() => {
      getUserApi(params.id).then(response => {
         if (!response) toast.error('El usuario que has visitado no existe.');
         setUser(response);
      }).catch(() => {
         toast.error('El usuario que has visitado no existe.');
      })
   }, [params]);

   useEffect(() => {
      getUsetEventsApi(params.id, 1).then(response => {
         setEvents(response);
      }).catch(() => {
         setEvents([]);
      })
   }, [params]);

   const moreData = () => {
      const pageTemp = page +1;
      setLoadingEvents(true);

      getUsetEventsApi(params.id, pageTemp).then(response => {
         if(!response) {
            setLoadingEvents(0);
         } else {
            setEvents([...events, ...response]);
            setPage(pageTemp);
            setLoadingEvents(false);
         }
      })
   }
   
   return (
      <BasicLayout className='user' setRefreshCheckLogin={setRefreshCheckLogin}>
         <div className='user__title'>
            <h2> {user ? `${user.name} ${user.surname}` : 'El usuario no existe' } </h2>
         </div>
         <BannerAvatar user={user} loggedUser={loggedUser} />
         <InfoUser user={user} />
         <div className='user__events'>
            <h3>Eventos</h3>
            {events && <ListEvents events={events} /> }
            <Button onClick={moreData}>
               {!loadingEvents ? (
                  loadingEvents !== 0 && 'Más eventos'
               ) : <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' /> }
            </Button>
         </div>
      </BasicLayout>
   );
}

export default withRouter(User);