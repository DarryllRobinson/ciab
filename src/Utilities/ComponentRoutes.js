import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '../Components/Menu';
import CreditVet from '../Components/CreditVet';

const ComponentRoutes = (props) => {
  //let localProps = props;
  let userType = 'agent'; //sessionStorage.getItem('foneBookUserType');

  function getAccessPaths() {
    switch (userType) {
      case 'agent':
        return (
          <React.Fragment>
            <Route exact path="/workspace" render={(props) => <Menu {...props}  />} />
            <Route exact path="/workspace/creditvet" render={(props) => <CreditVet {...props}  />} />
          </React.Fragment>
        )
      default:
        return <h1>Access Denied</h1>
    }
  }

  return (
    <Switch>
      {
        getAccessPaths()
      }
    </Switch>
  );
}

export default ComponentRoutes;
