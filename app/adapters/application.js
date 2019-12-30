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

// import JSONAPIAdapter from 'ember-data/adapters/json-api';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
// import config from 'my-app/config/environment';

// export default JSONAPIAdapter.extend(DataAdapterMixin, {
//   host: config.apiUrl,
//   namespace: config.apiNamespace,
//   authorizer: 'authorizer:application'
// });
