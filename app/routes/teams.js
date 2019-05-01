import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export const ALL_TEAMS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    order: 2,
    iconUrl:
      'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png',
  },
  {
    id: 'ms',
    name: 'Microsoft',
    order: 3,
    iconUrl:
      'https://gravatar.com/avatar/0ca1be2eaded508606982feb9fea8a2b?s=200&d=https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
  },
  {
    id: 'avengers',
    name: 'Avengers',
    order: 4,
    iconUrl:
      'https://pbs.twimg.com/profile_images/1113336188956434432/7XUkmgrG_400x400.jpg',
  },
];

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
    return ALL_TEAMS;
  }
}
