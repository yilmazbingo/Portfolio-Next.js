### JSON WEB TOKEN

- current implementation of our authentication is not secure. Because, when we login with our credentials, auth0 server is sending accessToken, idToken and expiresIn data to /callback. We are parsing the url, getting the expiresIn and adding it to current date and setting up the expiration time for the session. A malicous user can easily modify this, send a wrong information to the server so can be authenticated longer than it is supposed to.

- Solution is using the jwt token. A JWT technically is a mechanism to verify the owner of some JSON data. It’s an encoded string, which is URL safe, that can contain an unlimited amount of data (unlike a cookie), and it’s cryptographically signed.
When a server receives a JWT, it can guarantee the data it contains can be trusted because it’s signed by the source. No middleman can modify a JWT once it’s sent.It’s important to note that a JWT guarantees data ownership but not encryption; the JSON data you store into a JWT can be seen by anyone that intercepts the token, as it’s just serialized, not encrypted. For this reason, it’s highly recommended to use HTTPS with JWTs (and HTTPS in general).

- Id token that sent us is a jwt token. We are going to decode it, then we get **iat** property which is the datetime the token was created at. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is mostly used for decoding the jwt.
