import React, { useState, useEffect } from 'react';
import { Spinner, ButtonGroup, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { isEmpty } from 'lodash';

import ListUsers from '../../components/User/ListUsers/ListUsers';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import { getFollowsApi } from '../../api/follow';


import './Users.scss';
function Users(props) {
   const { setRefreshCheckLogin, location } = props;
   const [users, setUsers] = useState(null);
   const params = useUsersQuery(location);


   useEffect(() => {
      getFollowsApi(queryString.stringify(params)).then(response => {
         isEmpty(response) ? setUsers([]) : setUsers(response);
      }).catch(() => {
         setUsers([]);
      });
   }, []);

   return (
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin} className='users' title='Usuarios' >
         <div className='users__title'>
            <h2>Usuarios</h2>
            <input type='text' placeholder='Busca un usuario...' />
         </div>

         <ButtonGroup className='users__options'>
            <Button>Siguiendo</Button>
            <Button>Nuevos</Button>
         </ButtonGroup>
         {!users ? (
            <div className='users__loading'>
               <Spinner animation='border' variant='info' />
               Cargando usuarios...
            </div>
         ) : (
            <ListUsers users={users} />
         )}
      </BasicLayout>
   );
};

function useUsersQuery(location) {
   const { page = 1, type = 'Follow', search } = queryString.parse(location.search);

   return {page, type, search};
}

export default withRouter(Users);
