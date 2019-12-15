import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';

class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {
  @service currentUser;

  beforeModel() {
    return this._loadCurrentUser();
  }

  async sessionAuthenticated() {
    let _super = super.sessionAuthenticated;
    await this._loadCurrentUser();
    _super.call(this, ...arguments);
  }

  _loadCurrentUser() {
    return this.get('currentUser').load();
  }
}

export default ApplicationRoute;
