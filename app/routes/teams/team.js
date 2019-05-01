import Route from '@ember/routing/route';
import { ALL_TEAMS } from '../teams';

export default class TeamsTeamRoute extends Route {
  model({ teamId }) {
    return ALL_TEAMS.find(t => t.id == teamId);
  }
}
