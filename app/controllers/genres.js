import Controller from '@ember/controller';
import { empty } from '@ember/object/computed';
import { action } from '@ember/object';

import { tracked } from '@glimmer/tracking';

export default class Genres extends Controller{
  @tracked isAddingGenre= false
  @tracked newGenreName= ''

  @tracked isAddButtonDisabled= empty('newGenreName')

  @action
    addGenre() {
      this.set('isAddingGenre', true);
    }

    cancelAddGenre() {
      this.set('isAddingGenre', false);
    }

    async saveGenre(event) {
      event.preventDefault();

      const newGenre = this.store.createRecord('genre', { name: this.newGenreName });
      await newGenre.save();

      this.setProperties({
        newGenreName: '',
        isAddingGenre: false
      });
      this.transitionToRoute('genres.genre.movies', newGenre.id); 
    }
}

