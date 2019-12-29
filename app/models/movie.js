import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default class Movie extends DS.Model {
  @attr() title
  @attr() rating
  @belongsTo() genre
}