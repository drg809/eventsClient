import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getEventByIdApi } from '../../../api/event';
import BasicLayout from '../../../layout/BasicLayout/BasicLayout';
import InfoEvent from '../../../components/Events/InfoEvent/InfoEvent';
import EventPhoto from '../../../components/Events/EventPhoto';

import './InfoEvents.scss';

function InfoEvents(props) {
   const { setRefreshCheckLogin, match } = props;
   const { params } = match;
   const [event, setEvent] = useState(null);

   useEffect(() => {
      getEventByIdApi(params.id).then(response => {
         if (!response) toast.error('El evento que has visitado no existe.');
         setEvent(response);
      }).catch(() => {
         toast.error('El evento que has visitado no existe.');
      })
   }, [params]);

   return (
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className='event'>
         <EventPhoto event={event} />
         <div className='event__title'>
            <h2> {event ? `${event.name}` : 'El evento no existe' } </h2>
         </div>
         <InfoEvent event={event} />
      </BasicLayout>
   );
}

export default withRouter(InfoEvents);