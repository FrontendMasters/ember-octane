import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';
import fetch from 'fetch';

export default class TeamsRoute extends Route {
  /**
   * @type {AuthService}
   */
  @service auth;
  async beforeModel(transition) {
    await super.beforeModel(transition);
    if (!this.auth.currentUserId) {
      this.transitionTo('login');
    }
  }
  async model() {
    const response = await fetch('/api/teams');
    return response.json();
  }
}
