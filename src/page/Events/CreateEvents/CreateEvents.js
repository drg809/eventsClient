import React from 'react';

import BasicLayout from '../../../layout/BasicLayout/BasicLayout';
import EventsForm from '../../../components/Events/EventsForm/EventsForm';


import './CreateEvents.scss';

export default function CreateEvents() {
   return (
      <BasicLayout className='event'>
         <EventsForm />
      </BasicLayout>
   );
}