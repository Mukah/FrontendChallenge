import { Team } from "./team.model";

export class Tournament {
  /** Name */
  public name: string;

  /** Teams */
  public keys: Array<Team>;
}
