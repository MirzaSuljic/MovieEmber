import Route from '@ember/routing/route';

export default class Index extends Route{
  redirect(genre) {
    if (genre.description) {
      this.transitionTo('genres.genre.details');
    } else {
      this.transitionTo('genres.genre.movies');
    }
  }
}
