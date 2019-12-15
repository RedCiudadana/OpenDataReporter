import Service from '@ember/service';
import { isBlank } from '@ember/utils';
import { assert, debug } from '@ember/debug';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

/**
 * Service to make request to Google Vision API.
 *
 * @class Navbar
 * @namespace Services
 * @extends Ember.Service
 * @public
 */
class GoogleVisionService extends Service {
  @service session;

  init() {
    super.init(...arguments);
    debug('[google-vision:service] initalized!');
  }

  analyzeFile(gscloudfile) {
    assert("The gscloud file address can't be blank.", !isBlank(gscloudfile));

    let accessToken = this.get('session.data.authenticated.access_token');

    let body = {
      requests: [
        {
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION'
            }
          ],
          image: {
            source: {
              imageUri: gscloudfile
            }
          }
        }
      ]
    };

    return fetch('https://content-vision.googleapis.com/v1/images:annotate?alt=json', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
      method: 'POST',
      credentials: 'include'
      // referrerPolicy: 'no-referrer-when-downgrade'
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response.responses.firstObject.fullTextAnnotation.text);
      return response.responses.firstObject.fullTextAnnotation.text;
    });
  }
}

export default GoogleVisionService;

// fetch('https://content-vision.googleapis.com/v1/images:annotate?alt=json', {
//   credentials: 'include',
//   headers: {
//     accept: '*/*',
//     'accept-language': 'en-US,en;q=0.9,es-419;q=0.8,es;q=0.7',
//     authorization:
//       'Bearer ya29.ImW1BwgxLZpcavM9_jaQTqD9pnK6A4FUOIGyZ-mu0_SylS8i3xWco47B3Tayop8JTuo7HCDWEUcJVUigU9EUkNpe_GqqTW-HMxnIyBv61FjMmHQO4ApQSKejK8iWdaGjXl52fChhqw',
//     'content-type': 'application/json',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'same-origin',
//     'x-clientdetails':
//       'appVersion=5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F79.0.3945.79%20Safari%2F537.36&platform=Win32&userAgent=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F79.0.3945.79%20Safari%2F537.36',
//     'x-goog-encode-response-if-executable': 'base64',
//     'x-javascript-user-agent': 'apix/3.0.0 google-api-javascript-client/1.1.0',
//     'x-origin': 'https://explorer.apis.google.com',
//     'x-referer': 'https://explorer.apis.google.com',
//     'x-requested-with': 'XMLHttpRequest'
//   },
//   referrer:
//     'https://content-vision.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.es.xhypXBFw-YI.O%2Fam%3DwQE%2Fd%3D1%2Fct%3Dzgms%2Frs%3DAGLTcCNIYS8P8MA2BPqaol3qYCZ18OvnqA%2Fm%3D__features__',
//   referrerPolicy: 'no-referrer-when-downgrade',
//   mode: 'cors'
//   body:
//     '{"requests":[{"features":[{"type":"LABEL_DETECTION"}],"image":{"source":{"imageUri":"gs://cloud-samples-data/vision/demo-img.jpg"}}}]}',
//   method: 'POST',
// });
