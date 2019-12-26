import Service from '@ember/service';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { debug } from '@ember/debug';

class CurrentUserService extends Service {
  @service session;

  @tracked user;

  load() {
    debug('current-user:service - load');
    if (this.get('session.isAuthenticated')) {
      debug('current-user:service - authenticated');
      let token = this.get('session.session.authenticated.access_token');

      return fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then((user) => this.user = user)
      .catch((err) => {
        debug(err);
      });
    } else {
      debug('current-user:service - resolve no authenthicated');
      return resolve();
    }
  }
}

export default CurrentUserService;
