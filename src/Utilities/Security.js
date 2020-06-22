
export default class Security {

    writeLoginSession(user, loginTime) {
      if (loginTime === null) { alert('loginTime is null'); }

      //console.log('response.data: ', response.data);
      // Create session for logged in user
      //let config = await this.dataLayer.Get('/getconfig');
      //sessionStorage.setItem('foneBookConfig', JSON.stringify(config));
      sessionStorage.setItem('cwsUser', user);
      sessionStorage.setItem('cwsSession', loginTime);
    }

    validateSession() {
        let sessionAgeMilliseconds = (new Date()) - (new Date(sessionStorage.getItem('cwsSession')));
        let sessionAgeSeconds = Math.floor(sessionAgeMilliseconds / 1000);

        //30 Minute Time-Out (1800 seconds)
        if (sessionAgeSeconds >= 1800) {
            this.terminateSession();
            window.location = '/';
        }
        else {
            this.extendSession();
        }
    }

    extendSession() {
        sessionStorage.setItem('cwsSession', new Date().toString());
    }

    terminateSession() {
        sessionStorage.setItem('cwsSession', null);
    }

    checkLoginStatus(props) {
      if (props.loggedInStatus === "NOT_LOGGED_IN") return props.history.push('/');
    }
}
