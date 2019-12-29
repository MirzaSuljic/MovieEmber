import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | genres/genre', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:genres/genre');
    assert.ok(route);
  });
});
