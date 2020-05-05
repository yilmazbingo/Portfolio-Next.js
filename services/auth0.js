import auth0 from "auth0-js";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getCookieFromReq } from "../helpers/utils";

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH_CLIENT_ID,
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
    this.auth0.logout({
      returnTo: "",
      clientID: "AyjiNJgMky3Q3Qf04XjHwm3YRWtr6GEX",
    });
  }

  //this is async so we have to call it with async everywhere
  async verifyToken(token) {
    if (token) {
      //We must VERIFY THIS SIGNATURE BEFORE STORING AND USING a JWT.
      //option will get the header where kid is stored.
      //kid: a unique id for every key in the set.
      const decodedToken = jwt.decode(token, { complete: true });
      if (!decodedToken) return undefined;
      //this is object {keys:[{  }]} this array has only one item
      const jwks = await this.getJWKS();
      if (!jwks) {
        console.log("there is a network error");
      }
      console.log("jwks", jwks);
      const jwk = jwks.keys[0];

      //BUILD CERTIFICATE to verify our token

      //this x5c is an array x5c:[]
      let cert = jwk.x5c[0];
      // g means do this for all array items
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
      console.log("cert", cert);

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;
          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (ex) {
          return undefined;
        }
      }
    }
  }

  async getJWKS() {
    try {
      const res = await axios.get(
        //every openId server has to have this endpoint
        //if you visit here you will see
        "https://dev-udiktky2.auth0.com/.well-known/jwks.json"
      );
      const jwks = res.data;
      return res ? jwks : "there is a fetching data error";
    } catch (ex) {
      return console.log(ex);
    }
  }

  async clientAuth() {
    const token = Cookies.getJSON("jwt");
    const verifiedToken = this.verifyToken(token);
    return await verifiedToken;
  }

  async serverAuth(req) {
    // console.log(req.headers);
    if (req.headers.cookie) {
      const token = getCookieFromReq(req, "jwt");
      const verifiedToken = await this.verifyToken(token);
      return verifiedToken;
    }
    return undefined;
  }
}
const auth0Client = new Auth0();
export default auth0Client;
