import Route from '@ember/routing/route';

import { action } from '@ember/object';

export default class Details extends Route{

  resetController(controller) {
    controller.set('isEditing', false);
  }

  @action
    willTransition(transition) {
      if (this.controller.isEditing) {
        let leave = window.confirm('Are you sure?');
        if (!leave) {
          transition.abort();
        }
      }
    }
}
