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
    
  }
  
  setSession is where we are going to store the data into the cookies:
  
              setSession(authResult) {
                //converting everything to miliseconds
                const expiresAt =
                  JSON.stringify(authResult.expiresIn * 1000) + new Date().getTime();
                //idTokenPayload is the users'information
                Cookies.set("user", authResult.idTokenPayload); //user information
                Cookies.set("jwt", authResult.idToken); //this is jwt token
                Cookies.set("expiresAt", expiresAt);
              }
  
  After we set the session, we look at expiresAt and decide if user is authenticated or not.
  
          isAuthenticated() {
            const expiresAt = Cookies.getJSON("expiresAt");
            // console.log(new Date().getTime() < expiresAt);
            return new Date().getTime() < expiresAt;
          }
  
  
  
