import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { map } from 'lodash';
import configRouters from './configRouters';

export default function Routing(props) {
   const { setRefreshCheckLogin } = props;

   return (
      <Router>
         <Switch>
            {map(configRouters, (route, i) => (
               <Route key={i} path={route.path} exact={route.exact}>
                  <route.page setRefreshCheckLogin={setRefreshCheckLogin} />
               </Route>
            ))}
         </Switch>
      </Router>
   );
}
