import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  session: service(),
  
  authorize(xhr) {
    let { token } = this.session.data.authenticated;
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  }    
});

// // import DS from 'ember-data';
// // import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
// // import { computed } from '@ember/object';

// // const { JSONAPIAdapter } = DS;

// // export default JSONAPIAdapter.extend(DataAdapterMixin, {
// //   headers: computed('session.data.authenticated.access_token', function() {
// //     let headers = {};
// //     if (this.session.isAuthenticated) {
// //       // OAuth 2
// //       headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
// //     }

// //     return headers;
// //   }),
// // });

