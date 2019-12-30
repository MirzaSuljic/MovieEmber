import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default class Credentials extends Base{
 @service ajax;

  async authenticate(username, password) {
    let response =  await this.ajax.post('/token', {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      data: JSON.stringify({ username, password })
    });
    
    let { user_email: userEmail, token } = response;
    return { userEmail, token };
  }

  async restore(data) {
    return data;
  }
}


// import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
// import config from 'my-app/config/environment';

// const host = config.apiUrl || '';
// const namespace = config.apiNamespace;
// const serverTokenEndpoint = [ host, namespace, 'token' ];

// export default OAuth2PasswordGrant.extend({
//   serverTokenEndpoint: serverTokenEndpoint.join('/')
// });
