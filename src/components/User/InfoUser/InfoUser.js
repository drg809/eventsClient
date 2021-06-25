import React from 'react';
import { LocationIcon, LinkIcon, BirthIcon } from '../../../utils/Icons';

import './InfoUser.scss';

export default function InfoUser(props) {
   const { user } = props;

   return (
      <div className="info-user">
         <h2 className="name">{user?.name} {user?.surname}</h2>
         {user?.web && (
            <div className="web"> <LinkIcon /> {user.web}</div>
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
         </div>
      </div>
   );
}
