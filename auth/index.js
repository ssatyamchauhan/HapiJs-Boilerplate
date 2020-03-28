const service = require('./service');

exports.register = async function (server) {

  await server.register(require('bell'));
  await server.register(require('hapi-auth-basic'));
  await server.register(require('hapi-auth-cookie'));

  server.auth.strategy('simple', 'basic', {
    validate: service.validate
  });

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'cookie_encryption_password_secure',
    clientId: '1061916439476-umtc360sc93e8p1h4v0osi16um8smc8l.apps.googleusercontent.com',
    clientSecret: '8MdHwqTFcVD4l4wmbdRY4yw2',
    isSecure: false
  });

  server.auth.strategy('session', 'cookie', {
    password: 'password-should-be-32-characters',
    redirectTo: '/',
    appendNext: true,
    isSecure: false
  });


  server.route({
    method: 'GET',
    path: '/google/login',
    options: {
      auth: 'google',
      handler: (request, h) => {
        if (!request.auth.isAuthenticated) {
          console.log(request.auth.authenticated)
          console.log(request.auth.error)
          return `Authentication failed due to: ${request.auth.error}`
        }
        return h.redirect('/shift')

      }

    }

  })


  server.route({
    method: 'GET',
    path: '/logout',
    config: {
      auth: 'session',
    },
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect('/');
    }
  });
};

exports.pkg = {
  name: 'auth'
};