### Authentication with Auth0

    class Auth0 {
    constructor() {
      this.auth0 = new auth0.WebAuth({
        domain: "dev-ueiktty4.auth0.com",
        clientID: "AyjiNJgMkt3t3yf04XjHwm3YRWtr6GEX",
        redirectUri: "http://localhost:3000/callback",
        responseType: "token id_token",
      });
    }
    login() {
      this.auth0.authorize();
    }
    // login() is invoked by clicking on the Login button on Header
    // it redirects the user to the auth0 Universal Login page
    // once user is authenticated, it will be redirected to the /callback page
    // endpoint /callback is defined by us.

    //auth0 does not support promises. 
    //with this method we can use then and catch in other parts of the app
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        this.auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            resolve();
          } else if (err) {
            reject(err);
            console.log(err);
          }
        });
      });
    }
    setSession() {
      //save tokens
    }
  }
