import React from 'react';
import { Route } from 'react-router-dom';

function SecuredRoute(props) {
  console.log('SecuredRoute props: ', props);
  const {component: Component, path, loggedInStatus} = props;
  return (
    <Route path={path} render={() => {
      if (loggedInStatus !== 'LOGGED_IN') {
        //auth0Client.signIn();
        return <div>You have been logged out</div>;
      }
      return <Component {...props}/>
    }} />
  );
}

export default SecuredRoute;
