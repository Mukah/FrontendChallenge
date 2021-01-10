import { Team } from "./team.model";
import { TournamentKey } from "./tournament-key.model";

export class Tournament {
  /** Name */
  public name: string;

  /** Teams */
  public keys: Array<Array<TournamentKey>>;
}
