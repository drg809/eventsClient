import React from 'react';
import { withRouter } from 'react-router-dom';

import BasicLayout from '../../../layout/BasicLayout/BasicLayout';
import EventsForm from '../../../components/Events/EventsForm/EventsForm';


import './CreateEvents.scss';

function CreateEvents(props) {
   const { setRefreshCheckLogin } = props;
   return (
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className='event'>
         <EventsForm />
      </BasicLayout>
   );
}

export default withRouter(CreateEvents);