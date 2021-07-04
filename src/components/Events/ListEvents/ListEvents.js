import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import moment from 'moment';

import { getUserApi } from '../../../api/user';
import AvatarNotFound from '../../../assets/png/avatar-no-found.png';
import { API_HOST } from '../../../utils/constant';
import { replaceURLWithHTMLLinks } from '../../../utils/functions';

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

   const photoUrl = event.photo ? `${API_HOST}/events/photo?id=${event.id}` : AvatarNotFound;
   
   useEffect(() => {
      getUserApi(event.userId).then((response) => {
         setUserInfo(response);
         setAvatarUrl(response?.avatar ? `${API_HOST}/users/avatar?id=${response.id}` : AvatarNotFound);
      })
   }, [event]);

   return (
      <Link to={`/events?id=${event.id}`}>
         <div className='event' >
            <Image className='photo' src={photoUrl} />
            <div>
               <div className='name'>
                  <div>
                     {event.name}
                     <span>{moment(event.date).calendar()}</span>
                  </div>
                  <div>
                     <Image className='avatar' src={avatarUrl} roundedCircle />
                     {userInfo?.name} {userInfo?.surname}
                  </div>
               </div>
               <div dangerouslySetInnerHTML={{__html: replaceURLWithHTMLLinks(event.detail)}} />
            </div>
         </div>
      </Link>
   );
}