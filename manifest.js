const Path = require('path');

module.exports = {
  server: {
    port: 3000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: require('inert')
      },
      {
        plugin: require('hapi-swagger'),
      },
      {
        plugin: 'vision',
        options: {
          engines: {
            html: require('handlebars')
          },
          path: __dirname,
          layout: true,
          layoutPath: 'templates/layouts',
          helpersPath: 'templates/helpers',
          context: (request) => {
            return {
              credentials: request.auth.credentials
            }
          }
        }
      },
      {
        plugin: require('./logging')
      },
      {
        plugin: require('./auth')
      },
      {
        plugin: require('./home')
      },
      {
        plugin: require('./shift'),
        routes: {
          prefix: '/shift'
        }
      }
    ]
  }
};