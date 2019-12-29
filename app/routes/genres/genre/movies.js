import Route from '@ember/routing/route';
import { capitalize as capitalizeWords } from '.../helpers/capitalize';
import { action } from '@ember/object';

export default class Movies extends Route{

  resetController(controller) {
    controller.setProperties({
      isAddingMovie: false,
      newMovieTitle: ''
    });
  }

  @action
    didTransition() {
      let genre = this.modelFor('genres.genre');
      let name = capitalizeWords(genre.name);
      document.title = `${name} movies - Movie List`;
    }
}
