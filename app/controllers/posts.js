import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class PostsController extends Controller {

  newTitle;

  @action
  addPost() {
    this.store.createRecord('post', {
      title: this.newTitle,
      publishedAt: new Date()
    }).save();
    this.set('newTitle', "");
  }
}