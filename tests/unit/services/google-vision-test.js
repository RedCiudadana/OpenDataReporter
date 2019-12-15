import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | google-vision', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let service = this.owner.lookup('service:google-vision');
    expect(service).to.be.ok;
  });
});
