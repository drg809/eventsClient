import React from 'react';
import moment from 'moment';
import localization from 'moment/locale/es';

import { LocationIcon, LinkIcon, BirthIcon } from '../../../utils/Icons';
import './InfoUser.scss';

export default function InfoUser(props) {
   const { user } = props;

   return (
      <div className="info-user">
         <h2 className="name">{user?.name} {user?.surname}</h2>

         {user?.bio && (
            <div className="description">{user.bio}</div>
         )}
         <div className="more-info">
            {user?.location && (
               <p>
                  <LocationIcon />
                  {user.location}
               </p>
            )}
            {user?.web && (
               <a href={user.web} alt={user.web} target="_blank" rel="noopener noreferrer" > <LinkIcon /> {user.web}</a>
            )}
            {user?.date && (
               <p>
                  <BirthIcon />
                  {moment(user.date).locale('es', localization).format('LL')}
               </p>
            )}
         </div>
      </div>
   );
}
