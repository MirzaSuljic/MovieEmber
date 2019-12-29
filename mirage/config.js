import Response from 'ember-cli-mirage/response';

export default function() {
  this.get('/genres', function(schema, request) {
    if (!request.requestHeaders['Authorization']) {
      return new Response(401);
    }
    return schema.genres.all();
  });

  this.post('/genres');
  this.get('/genres/:id');

  this.get('/genres/:id/movies', function(schema, request) {
    let id = request.params.id;
    return schema.movies.where({ genreId: id });
  }); 
  
  this.post('/users');

  this.post('/token', function(schema, request) {
    let { username: email, password } = JSON.parse(request.requestBody);
    let users = schema.users.where({ email: email });

    if (users.length === 1 && users.models[0].password === password) {
      return {
        token: 'a.signed.jwt',
        user_email: email
      }
    }
  });
}
