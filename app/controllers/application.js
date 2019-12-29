import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Application extends  Controller{
  @tracked session = service()

  @action
    logout() {
      this.session.invalidate();
      this.transitionToRoute('login');
    }
}
