import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { A } from '@ember/array';

module('Unit | Model | Genre', function(hooks) {
  setupTest(hooks);

  test('#isGreatGenre', function(assert) {
    let store = this.owner.lookup('service:store');
    let pearlJam = run(() => {
      let movies = [
        store.createRecord('movie', { title: 'Daughter', rating: 5 }),
        store.createRecord('movie', { title: 'Rearviewmirror', rating: 4 }),
        store.createRecord('movie', { title: 'Who You Are', rating: 2 }),
      ];
      return store.createRecord('genre', { movies: A(movies) });
    });
    
    assert.ok(pearlJam.get('isGreatGenre'), 'A genre with 2 or more good movies is a great genre');

    let stiltskin = run(() => {
      let movies = [
        store.createRecord('movie', { title: 'Inside', rating: 5 }),
      ];
      return store.createRecord('genre', { movies: A(movies) });
    });

    assert.notOk(stiltskin.get('isGreatGenre'), 'A genre with less than 2 good movies is not a great genre');
  });
});
