import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { map } from 'lodash';
import { getUserApi } from '../../../api/user';
import AvatarNotFound from '../../../assets/png/avatar-no-found.png';
import { API_HOST } from '../../../utils/constant';

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
   const [userInfo, setUserInfo] = useState(null);
   const [avatarUrl, setAvatarUrl] = useState(null);

   useEffect(() => {
      getUserApi(event.userId).then((response) => {
         setUserInfo(response);
         setAvatarUrl(response?.avatar ? `${API_HOST}/users/avatar?id=${response.id}` : AvatarNotFound);
      })
   }, [event]);


   return <h2>{event.name}</h2>;
}