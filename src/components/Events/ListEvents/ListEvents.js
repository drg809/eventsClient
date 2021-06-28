import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { map } from 'lodash';

import './ListEvents.scss';

export default function ListEvents(props) {
   const { events } = props;

   return (
      <div className="list-events" >
         {map(events, (event, i) => (
            <Event key={i} event={event} />
         ))}
         
      </div>
   );
}

function Event(props) {
   const { event } = props;

   return <h2>{event.name}</h2>;
}