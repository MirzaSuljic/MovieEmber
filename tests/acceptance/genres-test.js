import { module, test } from 'qunit';
import { visit, click, fillIn, currentURL } from '@ember/test-helpers';
import { createGenre, loginAs } from 'movie-ember/tests/helpers/custom-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';


module('Acceptance | Genres', function(hooks) {
  setupApplicationTest(hooks);
  setupMirageTest(hooks);

  test('List genres', async function(assert) {
    this.server.create('genre', { name: 'Radiohead' });
    this.server.create('genre', { name: 'Long Distance Calling' });

    await loginAs('dave@tcv.com');
    await visit('/');

    assert.dom('[data-test-rr=genre-link]').exists({ count: 2 }, 'All genre links are rendered');
    assert.dom('[data-test-rr=genre-list-item]:first-child').hasText("Radiohead", 'The first genre link contains the genre name');
    assert.dom('[data-test-rr=genre-list-item]:last-child').hasText("Long Distance Calling", 'The other genre link contains the genre name');
  });

  test('Create a genre', async function(assert) {
    this.server.create('genre', { name: 'Royal Blood' });

    await loginAs('dave@tcv.com');
    await visit('/');
    await createGenre('Don Broco');

    assert.dom('[data-test-rr=genre-list-item]').exists({ count: 2 }, 'A new genre link is rendered');
    assert.dom('[data-test-rr=genre-list-item]:last-child').hasText('Don Broco', 'The new genre link is rendered as the last item');
    assert.dom('[data-test-rr=movies-nav-item] > .active').hasText('Songs', 'The Songs tab is active');
  });

  test('Sort movies in various ways', async function(assert) {
    let genre = this.server.create('genre', { name: 'Them Crooked Vultures' });
    this.server.create('movie', { title: 'Elephants', rating: 5, genre });
    this.server.create('movie', { title: 'New Fang', rating: 4, genre });
    this.server.create('movie', { title: 'Mind Eraser, No Chaser', rating: 4, genre });
    this.server.create('movie', { title: 'Spinning in Daffodils', rating: 5, genre });

    await loginAs('dave@tcv.com');
    await visit('/');
    await click('[data-test-rr=genre-link]');

    assert.equal(currentURL(), '/genres/1/movies');
    assert.dom('[data-test-rr=movie-list-item]:first-child').hasText('Elephants', 'The first movie is the highest ranked, first one in the alphabet');
    assert.dom('[data-test-rr=movie-list-item]:last-of-type').hasText('New Fang', 'The last movie is the lowest ranked, last one in the alphabet');

    await click('[data-test-rr=sort-by-title-desc]');
    
    assert.equal(currentURL(), '/genres/1/movies?sort=titleDesc');
    assert.dom('[data-test-rr=movie-list-item]:first-child').hasText('Spinning In Daffodils', 'The first movie is the one that comes last in the alphabet');
    assert.dom('[data-test-rr=movie-list-item]:last-of-type').hasText('Elephants', 'The last movie is the one that comes first in the alphabet');

    await click('[data-test-rr=sort-by-title-asc]');

    assert.equal(currentURL(), '/genres/1/movies?sort=titleAsc');
    assert.dom('[data-test-rr=movie-list-item]:first-child').hasText('Elephants', 'The first movie is the one that comes first in the alphabet');
    assert.dom('[data-test-rr=movie-list-item]:last-of-type').hasText('Spinning In Daffodils', 'The last movie is the one that comes last in the alphabet');

    await click('[data-test-rr=sort-by-rating-asc]');

    assert.equal(currentURL(), '/genres/1/movies?sort=ratingAsc');
    assert.dom('[data-test-rr=movie-list-item]:first-child').hasText('Mind Eraser, No Chaser', 'The first movie is the lowest ranked, last one in the alphabet');
    assert.dom('[data-test-rr=movie-list-item]:last-of-type').hasText('Spinning In Daffodils', 'The last movie is the highest ranked, first one in the alphabet');
  }); 

  test('Search movies', async function(assert) {
    let genre = this.server.create('genre', { name: 'Them Crooked Vultures' });
    this.server.create('movie', { title: 'Elephants', rating: 5, genre });
    this.server.create('movie', { title: 'New Fang', rating: 4, genre });
    this.server.create('movie', { title: 'Mind Eraser, No Chaser', rating: 4, genre });
    this.server.create('movie', { title: 'Spinning in Daffodils', rating: 5, genre });
    this.server.create('movie', { title: 'No One Loves Me & Neither Do I', rating: 5, genre });

    await loginAs('dave@tcv.com');
    await visit('/');
    await click('[data-test-rr=genre-link]');
    await fillIn('[data-test-rr=search-box]', 'no');

    assert.equal(currentURL(), '/genres/1/movies?s=no');
    assert.dom('[data-test-rr=movie-list-item]').exists({ count: 2 }, 'The movies matching the search term are displayed');

    await click('[data-test-rr=sort-by-title-desc]');

    assert.ok(currentURL().includes('s=no'));
    assert.ok(currentURL().includes('sort=titleDesc'));
    assert.dom('[data-test-rr=movie-list-item]:first-child').hasText('No One Loves Me & Neither Do I', 'A matching movie that comes later in the alphabet appears on top');
    assert.dom('[data-test-rr=movie-list-item]:last-of-type').hasText('Mind Eraser, No Chaser', 'A matching movie that comes sooner in the alphabet appears at the bottom');
  });

  test('Visit landing page without signing in', async function(assert) {
    await visit('/');

    assert.dom('[data-test-rr=form-header]').hasText('Log in to R&R');
    assert.dom('[data-test-rr=user-email]').doesNotExist();
  });
});
