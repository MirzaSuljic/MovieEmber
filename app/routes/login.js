import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

@UnauthenticatedRouteMixin
export default class Login extends Route{
  resetController(controller) {
    controller.setProperties({ email: null, password: null });
  }
}
