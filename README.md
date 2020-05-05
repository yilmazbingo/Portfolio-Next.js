### Authentication with Auth0

    class Auth0 {
    constructor() {
      this.auth0 = new auth0.WebAuth({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH_CLIENT_ID,
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
  
  setSession is where we are going to store the data into the cookies with [js-cookie] (https://www.npmjs.com/package/js-cookie)
  
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
  
  To log out the user we clear the cookies and invoke auth.logout():
  
      logout() {
        Cookies.remove("user");
        Cookies.remove("jwt");
        Cookies.remove("expiresAt");
        console.log("logout");
        this.auth0.logout({
          returnTo: "",
          clientID: "AyjiNJgMky3Q3Qf04XjHwm3YRWtr6GEX",
        });
      }

After all this settings, we have to inform our app about the authentication. 

            {auth0.isAuthenticated() ? (
                          <NavItem className="port-navbar-item">
                            <NavLink onClick={() => auth0.logout()}>
                              <Logout />
                            </NavLink>
                          </NavItem>
                        ) : (
                          <NavItem className="port-navbar-item">
                            <NavLink onClick={() => auth0.login()}>
                              <Login />
                            </NavLink>
                          </NavItem>
              )}

- This  just informs only the client side of our application. Our server currently is not aware of the cookies. We need to inform our server other wise, the code that server ships to the client and client-side code that rendered to the browser are not gonna match. we setup our code inside `getInitialProps` of _app.js because it is executed on client-side and server-side.

        import auth0 from "../services/auth0";

        export default class MyApp extends App {
          static async getInitialProps({ Component, router, ctx }) {
            // console.log("ctx", ctx.req.headers);
            let pageProps = {};
            const isAuthenticated = process.browser
              ? auth0.clientAuth()
              : auth0.serverAuth(ctx.req);
            console.log(isAuthenticated);

        //this makes sure that server finishes async coding before shipping everything to client
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
      }

      render() {
        const { Component, pageProps } = this.props;
        return <Component {...pageProps} />;
      }
     }

in auth.js

    clientAuth() {
        return this.isAuthenticated();
      }

      serverAuth(req) {
        // console.log(req.headers);
        if (req.headers.cookie) {
          const expiresAtCookie = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("expiresAt="));
          if (!expiresAtCookie) return;
          const expiresAt = expiresAtCookie.split("=")[1];
          return new Date().getTime() < expiresAt;
        }
      }
    }

since the implementation of authentication has changed, the way how we inform has to change as well. Anything that is returned from getInitialProps of _app.js is attached to each component as prop. so we have to pass this prop to every component's <BaseLayout/> because it wraps the header and in the header component we use it. in Header.js.(I will add redux in the future so I will just connect the header to the store)

                 const { isAuthenticated } = props;

                {isAuthenticated ? (
                  <NavItem className="port-navbar-item">
                    <NavLink onClick={() => auth0.logout()}>
                      <Logout />
                    </NavLink>
                  </NavItem>
                ) : (
                  <NavItem className="port-navbar-item">
                    <NavLink onClick={() => auth0.login()}>
                      <Login />
                    </NavLink>
                  </NavItem>
                )}

**NOTE** the component that did not get this prop, will not be aware of the authentication
