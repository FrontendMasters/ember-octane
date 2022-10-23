import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logout', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /teams', async function (assert) {
    await visit('/teams');

    assert.equal(currentURL(), '/teams');
    
    await click('.team-sidebar__logout-button') // button for logout

    assert.equal(currentURL(), '/login')
  });
});
