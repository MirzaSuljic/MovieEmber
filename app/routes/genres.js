import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { action } from '@ember/object';

@AuthenticatedRouteMixin
export default class Genres extends Route {
  async model() {
    return this.store.findAll('genre');
  }

  @action
    didTransition() {
      document.title = 'Genres - Movie List';
    }
}
