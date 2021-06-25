import React from 'react';
import { LocationIcon, LinkIcon, BirthIcon } from '../../../utils/Icons';

import './InfoUser.scss';

export default function InfoUser(props) {
   const { user } = props;

   return (
      <div className="info-user">
         <h2 className="name">{user?.name} {user?.surname}</h2>
         {user?.web && (
            <a href={user.web} alt={user.web} target="_blank" rel="noopener noreferrer" > <LinkIcon /> {user.web}</a>
         )}
         {user?.bio && (
            <div className="description">{user.bio}</div>
         )}
         <div className="">
            {user?.location && (
               <p>
                  <LocationIcon />
                  {user.location}
               </p>
            )}
            {user?.date && (
               <p>
                  <BirthIcon />
                  {user.date}
               </p>
            )}
         </div>
      </div>
   );
}
