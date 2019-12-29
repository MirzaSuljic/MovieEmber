import DS from 'ember-data';

const { attr, hasMany} = DS;

export default class Genre extends  DS.Model {
  @attr() name
  @attr() description
  @hasMany() goodMovies

  get isGreatGenre() {
    let goodMovies = this.get('movies').filter(movie => movie.rating >= 4);
    return goodMovies.length >= 2;
  }   
}