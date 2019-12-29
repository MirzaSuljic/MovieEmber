import { click, fillIn } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

export async function createGenre(name) {
  await click('[data-test-rr=new-genre-label]');
  await fillIn('[data-test-rr=new-genre-input]', name);
  return click('[data-test-rr=new-genre-button]');
}

export async function loginAs(email) {
  return authenticateSession({ token: 'a.signed.jwt', userEmail: email });
}
