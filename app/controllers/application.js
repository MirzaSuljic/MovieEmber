import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class Application extends  Controller{
  @service session;
  @service router;

  @action
    logout() {
      this.session.invalidate();
      this.router.transitionToRoute('login');
    }
}
