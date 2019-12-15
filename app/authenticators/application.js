import Torii from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';

/**
 * The provideers avaiables are:
 *  - Google (google-oauth2)
 */
export default Torii.extend({
  torii: service('torii')
});
