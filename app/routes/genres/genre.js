import Route from '@ember/routing/route';

export default class Genre extends Route {
  model(params) {
    return this.store.findRecord('genre', params.id);
  }
}
