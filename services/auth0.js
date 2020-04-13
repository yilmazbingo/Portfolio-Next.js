import auth0 from "auth0-js";
class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev-udiktky2.auth0.com",
      clientID: "AyjiNJgMky3Q3Qf04XjHwm3YRWtr6GEX",
      // response_mode: "form_post",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      // scope: "read:order write:order",
      //openid, email and profile are default scopes
    });
    this.login = this.login.bind(this);
  }
  login() {
    console.log("clicked");
    console.log(this.auth0);

    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash
      .then((authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        }
      })
      .tcatch((ex) => {
        console.log(ex);
      });
  }

  setSession() {
    //save tokens
  }
}
const auth0Client = new Auth0();
export default auth0Client;

// import React, { useState, useEffect, useContext } from "react";
// import createAuth0Client from "@auth0/auth0-spa-js";

// const DEFAULT_REDIRECT_CALLBACK = () =>
//   window.history.replaceState({}, document.title, window.location.pathname);

// export const Auth0Context = React.createContext();
// export const useAuth0 = () => useContext(Auth0Context);
// export const Auth0Provider = ({
//   children,
//   onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
//   ...initOptions
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState();
//   const [user, setUser] = useState();
//   const [auth0Client, setAuth0] = useState();
//   const [loading, setLoading] = useState(true);
//   const [popupOpen, setPopupOpen] = useState(false);

//   useEffect(() => {
//     const initAuth0 = async () => {
//       const auth0FromHook = await createAuth0Client(initOptions);
//       setAuth0(auth0FromHook);

//       if (
//         window.location.search.includes("code=") &&
//         window.location.search.includes("state=")
//       ) {
//         const { appState } = await auth0FromHook.handleRedirectCallback();
//         onRedirectCallback(appState);
//       }

//       const isAuthenticated = await auth0FromHook.isAuthenticated();

//       setIsAuthenticated(isAuthenticated);

//       if (isAuthenticated) {
//         const user = await auth0FromHook.getUser();
//         setUser(user);
//       }

//       setLoading(false);
//     };
//     initAuth0();
//     // eslint-disable-next-line
//   }, []);

//   const loginWithPopup = async (params = {}) => {
//     setPopupOpen(true);
//     try {
//       await auth0Client.loginWithPopup(params);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setPopupOpen(false);
//     }
//     const user = await auth0Client.getUser();
//     setUser(user);
//     setIsAuthenticated(true);
//   };

//   const handleRedirectCallback = async () => {
//     setLoading(true);
//     await auth0Client.handleRedirectCallback();
//     const user = await auth0Client.getUser();
//     setLoading(false);
//     setIsAuthenticated(true);
//     setUser(user);
//   };
//   return (
//     <Auth0Context.Provider
//       value={{
//         isAuthenticated,
//         user,
//         loading,
//         popupOpen,
//         loginWithPopup,
//         handleRedirectCallback,
//         getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
//         loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
//         getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
//         getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
//         logout: (...p) => auth0Client.logout(...p),
//       }}
//     >
//       {children}
//     </Auth0Context.Provider>
//   );
// };
