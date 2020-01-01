import Base from 'ember-simple-auth/authenticators/base';
// import { inject as service } from '@ember/service';

export default class Credentials extends Base{
  
  async authenticate(username, password) {
    let response = fetch('/token', {
      method: "post",
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

