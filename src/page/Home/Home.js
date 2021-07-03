import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';

import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import ListEvents from '../../components/Events/ListEvents';
import { getEventsFollowerApi } from '../../api/event';

import './Home.scss';

export default function Home(props) {
   const { setRefreshCheckLogin } = props;
   const [events, setEvents] = useState(null);
   const [page, setPage] = useState(1);
   const [loadingEvents, setLoadingEvents] = useState(false);

   useEffect(() => {
      getEventsFollowerApi(page).then(response => {
         setEvents(formatModel(response));
         !events ? setEvents(formatModel(response)) : (
            !response ? setLoadingEvents(0) : (
               setEvents([...events, ...formatModel(response)]) && setLoadingEvents(false)
            )
         )
      });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page]);

   const moreData = () => {
      setLoadingEvents(true);
      setPage(page +1);
   }

   return (
      <BasicLayout className='home' setRefreshCheckLogin={setRefreshCheckLogin} >
         <div className='home__title'>
            <h2>Inicio</h2>
         </div>
         {events && <ListEvents events={events} /> }
         <Button onClick={moreData} className='load-more'>
            {!loadingEvents ? (
               loadingEvents !== 0 && 'Cargar eventos'
            ) : (
               <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
            )}
         </Button>
      </BasicLayout>
   );
}

function formatModel(events) {
   const eventsTemp = [];

   events?.forEach(event => {
      eventsTemp.push({
         id: event.id,
         userId: event.UserFollowId,
         name: event.name,
         detail: event.detail,
         photo: event.photo,
         date: event.date
      })
   });
   return eventsTemp;
}