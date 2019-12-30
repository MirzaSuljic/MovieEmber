import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Login extends Controller {
  @service session;
  @service router;

  // email = 'test@test.com';
  // password = 'test123';

  @tracked errorMessage = '';

  @action
    async signIn(event) {
      event.preventDefault();
      
      let { email, password } = this;
      //console.log("Submit");
      // try{
      await this.session.authenticate('authenticator:credentials', email, password);
      this.router.transitionToRoute('genres');
      // }catch(e) {
      //   this.errorMessage = e.error || e;
      // }
    }



    
  }

