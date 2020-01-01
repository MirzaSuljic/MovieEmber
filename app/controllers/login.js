import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Login extends Controller {
  @service session;
  @service router;

  @tracked errorMessage = '';

  // @action
  //   async signIn(event) {
  //     event.preventDefault();
      
  //     let { email, password } = this;
  //     console.log("Submit");
  //     try{
  //     await this.session.authenticate('authenticator:credentials', email, password);
  //   }catch(e) {
  //     this.errorMessage = e.error || e;
  //   }
  //   if (this.session.isAuthenticated) {
  //     // What to do with all this success?
  //     this.router.transitionToRoute('genres');
  //     }
  @action
    async signIn(event) {
      event.preventDefault();
      let { email, password } = this.getProperties('email', 'password');
      // try {
        await this.session.authenticate('authenticator:oauth2', email, password). catch((error) => {
        this.set('errorMessage', error.error || error);
      });
        this.transitionToRoute('genres');

      // if (this.session.isAuthenticated) {
      // }
    }

      
    }

   