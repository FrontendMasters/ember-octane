import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

// get the router type
import Router from '@ember/routing/router';

// set constant so don't mess up setting and getting it in local storage
const AUTH_KEY = 'shlack-userid';

export default class AuthService extends Service {
	/**
	 * @type {Router}
	 */
	@service router;

	/**
	 * @param {string} userId
	 */
	loginWithUserId(userId) {
		window.localStorage.setItem(AUTH_KEY, userId)
		this.router.transitionTo('teams')
	}

	get isAuthenticated() {
		return !!this.currentUserId;
	}

	get currentUserId() {
		return window.localStorage.getItem(AUTH_KEY)
	}

	@action
	logout() {
		window.localStorage.removeItem(AUTH_KEY);
		this.router.transitionTo('login')
	}
}
