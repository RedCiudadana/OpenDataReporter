import Service from '@ember/service';
import { isBlank } from '@ember/utils';
import { assert, debug } from '@ember/debug';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

/**
 * Service to make request to Google Vision API.
 *
 * @class GoogleVisionService
 * @namespace Services
 * @extends Ember.Service
 * @public
*/
export default class GoogleVisionService extends Service {
  @service session;

  init() {
    super.init(...arguments);
    debug('[google-vision:service] initalized!');
  }

  /**
   * Extract text from uploaded file encoded base64 and return a array with array per document with all text per pages.
   * Google Vision Endpoint: `https://vision.googleapis.com/v1/files:annotate`
   *
   * @param {string} file The file to upload encoded in URL format
   */
  analyzeAttachFile(file) {
    let accessToken = this.get('session.data.authenticated.access_token');

    let body = {
      requests: [
        {
          inputConfig: {
            content: file.replace(/^data:.+;base64,/, ''),
            mimeType: 'application/pdf'
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION'
            }
          ]
        }
      ]
    };

    return fetch('https://cors-anywhere.herokuapp.com/https://vision.googleapis.com/v1/files:annotate?alt=json', {
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
      return response.responses.map((response) => {
        return response.responses.map((page) => page.fullTextAnnotation.text);
      });
    });
  }

  /**
   * Extract text from Google Cloud Storage file.
   *
   * @param {string} gscloudfile URL from Google Cloud Storage file
   * @returns {array} `[...[...string]]` [Documents[...Page{string}]]
   */
  analyzeFileFromCloudStorage(gscloudfile) {
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

    return fetch('https://cors-anywhere.herokuapp.com/https://content-vision.googleapis.com/v1/images:annotate?alt=json', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
      method: 'POST',
      credentials: 'include'
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.responses.map((document) => document.fullTextAnnotation.text);
    });
  }
}
