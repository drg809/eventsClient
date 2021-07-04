import React from 'react';
import { withRouter } from 'react-router-dom';


import BasicLayout from '../../../layout/BasicLayout/BasicLayout';

import './InfoEvents.scss';

function InfoEvents(props) {
   const { setRefreshCheckLogin } = props;
   console.log(props);

   return (
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className='event'>
         <h2>InfoEvent</h2>
      </BasicLayout>
   );
}

export default withRouter(InfoEvents);