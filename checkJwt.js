//auth0 middleware
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri:`https://dev-tick-gf2.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "iZFfzzr94dgSW7aFC19LB6Ex5eTXWdrD",
  issuer: `https://dev-tick-gf2.auth0.com/`,
  algorithms: ['RS256']
});

module.exports = checkJwt