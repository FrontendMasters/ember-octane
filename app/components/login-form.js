import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class LoginFormComponent extends Component {
	/**
	 * @type {string}
	 */
	@tracked
	userId = null;

	/**
	 * @type {AuthService}
	 */
	@service auth;

	// js getter
	get isDisabled() {
		return !this.userId;
	}
	/**
	 * Using the `@action` to avoid "this" being the form 
	 * @param {string} pickedUserId 
	 */
	handleUserId(pickedUserId) {
		if (typeof pickedUserId === 'string' && pickedUserId.length > 0) {
			// can access this service through this via `@service auth;`
			this.auth.loginWithUserId(pickedUserId)
		}
	}

	@action
	onUserSelect(event) {
		this.userId = event.target.value;
	}
	
	/**
	 * 
	 * @param {Event & { target: HTMLFormElement }} event 
	*/
	@action
	onLoginFormSubmit(event) {
		const { target } = event;
		const pickedUserId = target.querySelector("select").value;
		event.preventDefault();
		this.handleUserId(pickedUserId)
	}
}
