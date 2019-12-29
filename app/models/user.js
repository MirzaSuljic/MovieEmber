import DS from 'ember-data';
const { attr } = DS;

export default class User extends  DS.Model {
  @attr()email
  @attr() password
}

