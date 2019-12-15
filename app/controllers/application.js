import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

class ControllerApplication extends Controller {
  @service session;
  @service currentUser;
  @service googleVision;

  @action
  login() {
    this.get('session').authenticate('authenticator:application', 'google-oauth2-bearer-v2');
  }

  @action
  logout() {
    this.get('session').invalidate();
  }

  @action
  showSessionInfo() {
    this.googleVision.analyzeFile('gs://redciudadana-datatesting/visionAPI/0001.jpg');
  }
}

export default ControllerApplication;
