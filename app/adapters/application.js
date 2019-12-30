import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { inject as service } from '@ember/service';
// import { env } from 'ember-cli/lib/broccoli/ember-app';


// let options = {
//   session: service(),

//   authorize(xhr) {
//     let { token } = this.session.data.authenticated;
//     xhr.setRequestHeader('Authorization', `Bearer ${token}`);
//   }
// };

// // if(env.apiHost){
// //   options.host = ENV.apiHost;
// // }

//export default DS.JSONAPIAdapter.extend(DataAdapterMixin, options);

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  session: service(),
  
  authorize(xhr) {
    let { token } = this.session.data.authenticated;
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  }    
});


