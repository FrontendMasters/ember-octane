import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | team-sidebar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('myTeam', {
      name: '',
      channels: [
        {
          name: 'general',
        },
      ],
    });
    await render(hbs`<TeamSidebar @team={{this.myTeam}} />`);

    assert.deepEqual(
      this.element.textContent
        .trim()
        .replace(/\s*\n+\s*/g, '\n')
        .split('\n'),

      ['Mike North', 'Channels', '#', 'general', 'Logout']
    );
  });
});
