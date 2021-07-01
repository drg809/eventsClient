import React, { useState, useEffect } from 'react';
import { Spinner, ButtonGroup, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { getFollowsApi } from '../../api/follow';

import BasicLayout from '../../layout/BasicLayout/BasicLayout';

import './Users.scss';
function Users(props) {
   const { setRefreshCheckLogin, location } = props;
   const [users, setUsers] = useState(null);
   const params = useUsersQuery(location);


   useEffect(() => {
      getFollowsApi(queryString.stringify(params)).then(response => {
         console.log(response);
      }).catch(() => {
         setUsers([]);
      });
   }, []);

   return (
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className='users' title='usuarios' >
         <div className='users__title'>
            <h2>Usuarios</h2>
            <input type='text' placeholder='Busca un usuario...' />
         </div>

         <ButtonGroup className='users__options'>
            <Button>Siguiendo</Button>
            <Button>Nuevos</Button>
         </ButtonGroup>
      </BasicLayout>
   );
};

function useUsersQuery(location) {
   const { page = 1, type = 'Follow', search } = queryString.parse(location.search);

   return {page, type, search};
}

export default withRouter(Users);
