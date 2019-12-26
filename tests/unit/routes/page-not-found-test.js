import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | page-not-found', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:page-not-found');
    expect(route).to.be.ok;
  });
});
