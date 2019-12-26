import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

class ControllerApplication extends Controller {
  @service session;
  @service currentUser;
  @service googleVision;

  @tracked
  textAnalyzed = 'Nothing analyzed yet';

  @action
  login() {
    this.get('session').authenticate('authenticator:application', 'google-oauth2-bearer-v2');
  }

  @action
  logout() {
    this.get('session').invalidate();
  }

  @action
  getTextFromFile() {
    this.googleVision.analyzeFileFromCloudStorage('gs://redciudadana-datatesting/visionAPI/0001.jpg').then((text) => {
      this.textAnalyzed = text;
    });
  }

  @action
  uploadFileAndGetText(file) {
    file.readAsDataURL().then((fileBase64URL) => {
      this.googleVision.analyzeAttachFile(fileBase64URL).then((text) => {
        this.textAnalyzed = text;
      });
    });
  }
}

export default ControllerApplication;
