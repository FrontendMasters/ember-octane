import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  loginAsUserWithId(val) {
    console.log('UserId: ', val);
  }
  /**
   *
   * @param {Event & {target: HTMLFormElement}} evt
   */

  @action
  onLoginFormSubmit(evt) {
    const { target } = evt;
    const val = target.querySelector('select').value;
    evt.preventDefault();
    debugger;
    this.loginAsUserWithId(val);
  }
}
