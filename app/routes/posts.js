import Route from '@ember/routing/route';

export default class PostsRoute extends Route {
    model({ post_id }) {
        return this.store.findRecord('post', post_id);
      }
}
