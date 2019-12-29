import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}
Router.map(function() {
  this.route('genres', function() {
    this.route('genre', { path: ':id' }, function() {
      this.route('movies');
      this.route('details');
    });
  });
  this.route('login');
});


