import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Details extends Controller {
  @tracked isEditing= false

  @action
    edit() {
      this.set('isEditing', true);
    }

    async save(genre) {
      await genre.save();
      this.set('isEditing', false);
    }
  }
