import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  async model() {
    return this.store.findAll('genre');
  },

  actions: {
    didTransition() {
      document.title = 'Genres - Movie List';
    }
  }
});
