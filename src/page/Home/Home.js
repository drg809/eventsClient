import React from 'react';
import BasicLayout from '../../layout/BasicLayout/BasicLayout';

import './Home.scss';

export default function Home(props) {
   const { setRefreshCheckLogin } = props;

   return (
      <BasicLayout className='home' setRefreshCheckLogin={setRefreshCheckLogin} >
         <div className='home__title'>
            <h2>Inicio</h2>
         </div>
         <p>Lista de Eventos</p>
         <p>Cargar más</p>
      </BasicLayout>
   );
}
