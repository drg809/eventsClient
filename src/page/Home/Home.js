import React, { useState, useEffect } from 'react';
import { Button, Spinner, ButtonGroup } from 'react-bootstrap';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { useDebouncedCallback } from 'use-debounce';
import { withRouter } from 'react-router-dom';


import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import ListEvents from '../../components/Events/ListEvents';
import { getEventsFollowerApi } from '../../api/event';

import './Home.scss';

function Home(props) {
   const { setRefreshCheckLogin, location, history } = props;
   const [events, setEvents] = useState(null);
   const [page, setPage] = useState(1);
   const [loadingEvents, setLoadingEvents] = useState(false);
   const params = useUsersQuery(location);
   const [typeUser, setTypeUser] = useState(params.type || 'follow');

   const onSearch = useDebouncedCallback((value) => {
      setEvents(null);
      history.push({search: queryString.stringify({...params, search: value, page: 1 }),});
   }, 200);


   useEffect(() => {
      getEventsFollowerApi(queryString.stringify(params)).then(response => {
         // eslint-disable-next-line eqeqeq
         params.page == 1 ? (isEmpty(response) ? setEvents([]) : setEvents(formatModel(response))) : (!response ? setLoadingEvents(0) :  setEvents([...events, ...formatModel(response)]));
         setLoadingEvents(false);
      }).catch(() => {
         setEvents([]);
      });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location]);

   const onChangeType = type => {
      setEvents(null);
      if(type === 'new') {
         setTypeUser('new');
      } else {
         setTypeUser('follow');
      }

      history.push({
         search: queryString.stringify({type: type, page: 1, search: ''})
      })
   }


   const moreData = () => {
      setLoadingEvents(true);
      setPage(page +1);
   }

   return (
      
      <BasicLayout className='home' setRefreshCheckLogin={setRefreshCheckLogin} >
         <div className='home__title'>
            <h2>Eventos Próximos</h2>
            <input type='text' placeholder='Busca un evento...' onChange={(e) => onSearch(e.target.value)} />
         </div>

         <ButtonGroup className='users__options'>
            <Button className={typeUser === 'follow' && 'active'} onClick={() => onChangeType('follow')}>Siguiendo</Button>
            <Button className={typeUser === 'new' && 'active'} onClick={() => onChangeType('new')}>Nuevos</Button>
         </ButtonGroup>
         {events && <ListEvents events={events} /> }
         <Button onClick={moreData} className='load-more'>
            {!loadingEvents ? (
               loadingEvents !== 0 ? 'Cargar eventos' : 'No hay eventos'
            ) : (
               <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
            )}
         </Button>
      </BasicLayout>
   );
}

function formatModel(events) {
   const eventsTemp = [];
   events.forEach(event => {
      eventsTemp.push({
         id: event.Event._id,
         userId: event.userFollowId,
         name: event.Event.name,
         detail: event.Event.detail,
         photo: event.Event.photo,
         date: event.Event.date
      })
   });
   return eventsTemp;
}

function useUsersQuery(location) {
   const { page = 1, type = 'follow', search } = queryString.parse(location.search);

   return {page, type, search};
}

export default withRouter(Home);