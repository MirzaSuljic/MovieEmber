import Controller from '@ember/controller';
import { empty, sort } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { capitalize } from '.../helpers/capitalize';

export default class Movies extends  Controller {
  @tracked queryParams= {
    sortBy: 'sort',
    searchTerm: 's'
  }

  @tracked isAddingMovie = false
  @tracked newMovieTitlev =''
  @tracked sortBy = 'ratingDesc'
  @tracked searchTerm = ''

  @tracked isAddButtonDisabled= empty('newMovieTitle')

  get sortProperties() /*:computed('sortBy', function()*/ {
    let options = {
      ratingDesc: ['rating:desc', 'title:asc'],
      ratingAsc: ['rating:asc', 'title:asc'],
      titleDesc: ['title:desc'],
      titleAsc: ['title:asc']
    };

    return options[this.sortBy];
  }
  
  @tracked sortedMovies = sort('matchingMovies', 'sortProperties')

  get matchingMovies()  /*: computed('model.movies.@each.title', 'searchTerm', function() */{
    let searchTerm = this.searchTerm.toLowerCase();

    return this.model.get('movies').filter(movie => movie.title.toLowerCase().includes(searchTerm));
  }

  get newMoviePlaceholder() /*: computed('model.name', function()*/ {
    return `New ${capitalize(this.model.name)} movie`;
  }

  @action
    addMovie() {
      this.set('isAddingMovie', true);
    }

    cancelAddMovie() {
      this.set('isAddingMovie', false);
    }

    async saveMovie(genre, event) {
      event.preventDefault();

      const newMovie = this.store.createRecord('movie', { 
        title: this.newMovieTitle,
        genre
      });

      await newMovie.save();
      this.set('newMovieTitle', '');
    }

    updateRating(movie, rating) {
      movie.set('rating', movie.rating === rating ? rating - 1 : rating);
      movie.save();
    }
}
