import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  links(genre) {
    return {
      movies: {
        related: `/genres/${genre.id}/movies`
      }
    };
  }
});
