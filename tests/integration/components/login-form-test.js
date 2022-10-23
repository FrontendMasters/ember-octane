import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<LoginForm />`);

    assert.deepEqual(this.element.textContent.trim().replace(/\s*\n+\s*/g, '\n')
      .split('\n'),
      [
      "Login",
      "Select a user",
      "Testy Testerson",
      "Sample McData",
      ]);
    
    // can set the type here as well so vs code knows the type  
    let button = /**  @type {HTMLInputElement}*/ (find('input[type="submit"]'));
    assert.equal(button.disabled, true)

    await fillIn('select', '1')

    assert.equal(button.disabled, false)

  });
});
