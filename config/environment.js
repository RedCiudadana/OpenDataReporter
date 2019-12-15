'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'open-data-reporter',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    torii: {
      allowUnsafeRedirect: true,
      // a 'session' property will be injected on routes and controllers
      // sessionServiceName: 'session',
      providers: {
        'google-oauth2-bearer-v2': {
          scope: 'openid profile email https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloud-vision',
          apiKey: '1000752502600-ddjlmq2sldpm7bie85me0pkt50j4n5gm.apps.googleusercontent.com',
          redirectUri: 'http://localhost:4200/oauth2callback'
        }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
