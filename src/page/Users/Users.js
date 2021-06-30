import React from 'react';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';

import './Users.scss';

export default function Users(props) {
   const { setRefreshCheckLogin } = props;

   return (
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className='users' title='usuarios' >
         <h2>Users</h2>
      </BasicLayout>
   );
}
