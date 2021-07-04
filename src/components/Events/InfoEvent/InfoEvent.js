import React from 'react';
import moment from 'moment';
import localization from 'moment/locale/es';

import { LocationIcon, LinkIcon, BirthIcon } from '../../../utils/Icons';
import './InfoEvent.scss';

export default function InfoEvent(props) {
   const { event } = props;

   return (
      <div className='info-event'>
         {event?.date && (
            <p>
               <BirthIcon />
               {moment(event?.date).locale('es', localization).format('LL')}
            </p>
         )}

         <div className='more-info'>
            {/* {event?.location && (
               <p>
                  <LocationIcon />
                  {event.location}
               </p>
            )} */}
            {event?.detail}

         </div>
      </div>
   );
}
