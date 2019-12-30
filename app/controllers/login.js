import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Login extends Controller {
  @tracked session = service()

  @action
    async signIn(event) {
      event.preventDefault();
      
      let { email, password } = this;
      //console.log("Submit");
      await this.session.authenticate('authenticator:credentials', email, password);
      this.transitionToRoute('genres');
    }



    
  }

