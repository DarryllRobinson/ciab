import React, { useEffect, useState, useContext } from 'react';
import { render } from "react-dom";
import { Router, Switch, Route } from "react-router";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";
import { SessionContext, getSessionCookie, setSessionCookie } from "./session";

const history = createBrowserHistory();

const LoginHandler = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // NOTE request to api login here instead of this fake promise
    await new Promise(r => setTimeout(r(), 1000));
    setSessionCookie({ email });
    history.push("/");
    setLoading(false);
  };

  if (loading) {
    return <h4>Logging in...</h4>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

const ProtectedHandler = ({ history }) => {
  const session = useContext(SessionContext);
  if (session.email === undefined) {
    history.push("/login");
  }
  return (
    <div>
      <h6>Protected data for {session.email}</h6>
      <Link to="/logout">Logout here</Link>
    </div>
  );
};

const LogoutHandler = ({ history }) => {
  useEffect(() => {
    Cookies.remove("session");
    history.push("/login");
  }, [history]);

  return <div>Logging out!</div>;
};

/*const LogoutHandler = ({ history }) => {
  useEffect(
    () => {
      Cookies.remove("session");
      history.push("/login");
    },
    [history]
  );

  return <div>Logging out!</div>;
};*/

const Routes = () => {
  const [session, setSession] = useState(getSessionCookie());
  console.log('Routes session before: ', session);
  console.log('Routes session before typeof: ', typeof session);

  useEffect(() => {
  // assuming that session is not an array or object
  if (getSessionCookie().email === session.email) {
    return;
  }
  setSession(getSessionCookie());
}, [session]);
  /*useEffect(
    () => {
      setSession(getSessionCookie());
    },
    [session]
  );*/
  console.log('Routes session: ', session);
  console.log('Routes session typeof: ', typeof session);

  return (
    <SessionContext.Provider value={session}>
      <Router history={history}>
        <div className="navbar">
          <h6 style={{ display: "inline" }}>Nav Bar</h6>
          <h6 style={{ display: "inline", marginLeft: "5rem" }}>
            {session.email || "No user is logged in"}
          </h6>
        </div>
        <Switch>
          <Route path="/login" component={LoginHandler} />
          <Route path="/logout" component={LogoutHandler} />
          <Route path="*" component={ProtectedHandler} />
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
};

const App = () => (
  <div className="App">
    <Routes />
  </div>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
