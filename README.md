### JSON WEB TOKEN

- current implementation of our authentication is not secure. Because, when we login with our credentials, auth0 server is sending accessToken, idToken and expiresIn data to /callback. We are parsing the url, getting the expiresIn and adding it to current date and setting up the expiration time for the session. A malicous user can easily modify this, send a wrong information to the server so can be authenticated longer than it is supposed to.

- Solution is using the jwt token. A JWT technically is a mechanism to verify the owner of some JSON data. It’s an encoded string, which is URL safe, that can contain an unlimited amount of data (unlike a cookie), and it’s cryptographically signed.
When a server receives a JWT, it can guarantee the data it contains can be trusted because it’s signed by the source. No middleman can modify a JWT once it’s sent.It’s important to note that a JWT guarantees data ownership but not encryption; the JSON data you store into a JWT can be seen by anyone that intercepts the token, as it’s just serialized, not encrypted. For this reason, it’s highly recommended to use HTTPS with JWTs (and HTTPS in general).

- Id token that sent us is a jwt token. We are going to decode it, then we get **iat** property which is the datetime the token was created at. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is mostly used for decoding the jwt.
        
        //this will return boolean
        verifyToken(token) {
            if (token) {
              const decodedToken = jwt.decode(token);
              const expiresAt = decodedToken.exp * 1000;
              return decodedToken && new Date().getTime() < expiresAt
                ? decodedToken
                : undefined;
            }
          }

now we are going to use this return value of this function for authentication.

     clientAuth() {
        const token = Cookies.getJSON("jwt");
        const verifiedToken = this.verifyToken(token);
        return verifiedToken;
      }

    serverAuth(req) {
      // console.log(req.headers);
      if (req.headers.cookie) {
        const tokenCookie = req.headers.cookie
          .split(";")
          .find((c) => c.trim().startsWith("jwt=")); // we named out token id as jwt
        if (!tokenCookie) return;
        const token = tokenCookie.split("=")[1];
        const verifiedToken = this.verifyToken(token);
        return verifiedToken;
      }
      return undefined;
    }
    
  in _app.js we returned user instead isAuthenticated but since since we passed isAuthenticated to all the components, we can do a little trick and keep the isAuthenticated:
  
    const user = process.browser
        ? auth0.clientAuth()
        : auth0.serverAuth(ctx.req);


    const auth = { user, isAuthenticated: !!user };

    return { pageProps, auth };
    
 #### Signature of JWT
 - Once we click on login, we send a request to auth0 server. If all the data is validated, auth0 server will create a jwt token. Jwt contains header, payload and signature. Auth0 is using RS256 algorithm to sign jwt token. RS256 generates an asymmetric signature which means a private key must be used to sign the JWT and a different public key must be used to verify the signature. Private key is used by the auth0 server. We need to verify the token on the client side. To increase the security we are also verify that signature of the idToken belongs to auth0 server.
 
- Retrieve the JWKS and filter for potential signing keys. JWKS is a set of keys containing the public keys that should be used to verify any JWT issued by the authorization server. "Auth0 exposes a JWKS endpoint for each tenant". We need to make request from our browser to get those keys.
- Extract the JWT from the request’s authorization header. 
- Decode the JWT and grab the kid (keyId) from the header. 
- Find the signing key in the filtered JWSK with a matching kid property. 
- Using the x5c property to build a certificate which will be used to verify the JWT signature. 

A well-formed (JWT) consists of three concatenated Base64url-encoded strings, separated by dots.
- Header: contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
- Payload (set of claims): contains verifiable security statements, such as the identity of the user and the permissions they are allowed.
- Signature: used to validate that the token is trustworthy and has not been tampered with. We must VERIFY THIS SIGNATURE BEFORE STORING AND USING a JWT.

-When creating clients and resources servers (APIs) in Auth0, two algorithms are supported for signing JSON Web Tokens (JWTs): RS256 and HS256. HS256 is the default for clients and RS256 is the default for APIs. When building applications, it is important to understand the differences between these two algorithms. To begin, HS256 generates a symmetric MAC and RS256 generates an asymmetric signature. Simply put HS256 must share a secret with any client or API that wants to verify the JWT. Like any other symmetric algorithm, the same secret is used for both signing and verifying the JWT. This means there is no way to fully guarantee Auth0 generated the JWT as any client or API with the secret could generate a validly signed JWT. On the other hand, RS256 generates an asymmetric signature, which means a private key must be used to sign the JWT and a different public key must be used to verify the signature. Unlike symmetric algorithms, using RS256 offers assurances that Auth0 is the signer of a JWT since Auth0 is the only party with the private key.

    async verifyToken(token) {
        if (token) {
          //We must VERIFY THIS SIGNATURE BEFORE STORING AND USING a JWT.
          //option will get the header where kid is stored.
          //kid: a unique id for every key in the set.
          const decodedToken = jwt.decode(token, { complete: true });
          if (!decodedToken) return undefined;
          //this is object {keys:[{  }]} this array has only one item
          const jwks = await this.getJWKS();
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


