import Route from '@ember/routing/route';

export default class TeamsIndexRoute extends Route {
  async beforeModel(transition) {
    await super.beforeModel(transition);
    const teams = this.modelFor('teams');
    if (teams.length > 0) {
      this.replaceWith('teams.team', teams[0].id);
    }
  }
}
