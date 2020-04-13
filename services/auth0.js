import auth0 from "auth0-js";
import Cookies from "js-cookie";
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
    this.logout = this.logout.bind(this);
  }
  login() {
    this.auth0.authorize();
  }

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

  setSession(authResult) {
    //converting everything to miliseconds
    const expiresAt =
      JSON.stringify(authResult.expiresIn * 1000) + new Date().getTime();
    //idTokenPayload is the users'information
    Cookies.set("user", authResult.idTokenPayload);
    Cookies.set("jwt", authResult.idToken);
    Cookies.set("expiresAt", expiresAt);
  }

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

  isAuthenticated() {
    const expiresAt = Cookies.getJSON("expiresAt");
    // console.log(new Date().getTime() < expiresAt);
    return new Date().getTime() < expiresAt;
  }

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
