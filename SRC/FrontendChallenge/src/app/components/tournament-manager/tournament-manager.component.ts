import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { MatRadioGroup } from '@angular/material';
import { Team } from 'src/app/models/team.model';
import { TournamentKey } from 'src/app/models/tournament-key.model';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
  selector: 'tournament-manager',
  templateUrl: './tournament-manager.component.html',
  styleUrls: ['./tournament-manager.component.scss'],
  host: { class: 'tournament-manager' }
})
export class TournamentManager {
  @ViewChildren(MatRadioGroup) radioGroups: QueryList<MatRadioGroup>;

  @Input() tournament: Tournament;

  @Output() change: EventEmitter<Team> = new EventEmitter<Team>();

  constructor() { }

  onKeyChange(event: any, stageIndex: number, keyIndex: number) {
    let nextStageKeyIndex = (keyIndex % 2 == 0) ? keyIndex / 2 : (keyIndex - 1) / 2;

    if ((stageIndex + 1) < this.getTotalStages()) {
      if (!this.tournament.keys[stageIndex + 1]) this.tournament.keys[stageIndex + 1] = [];
      if (!this.tournament.keys[stageIndex + 1][nextStageKeyIndex]) this.tournament.keys[stageIndex + 1][nextStageKeyIndex] = new TournamentKey();

      if (keyIndex % 2 == 0) {
        this.tournament.keys[stageIndex + 1][nextStageKeyIndex].team1 = event.value;
      } else {
        this.tournament.keys[stageIndex + 1][nextStageKeyIndex].team2 = event.value;
      }

      for(let i = 0; i < this.tournament.keys[stageIndex + 1].length; i++) {
        this.resetRadioButtonGroup(stageIndex + 1, i);
      }

      this.tournament.keys.splice(stageIndex + 2);

      this.change.emit(undefined);
    } else {
      this.change.emit(event.value);
    }
  }

  getTotalStages() {
    let amount = 1;
    
    for (let keys = this.tournament.keys[0].length; keys > 1; keys = keys / 2) {
      amount++;
    }

    return amount;
  }

  resetRadioButtonGroup(stageIndex: number, keyIndex: number) {
    let radioGroup: MatRadioGroup = this.radioGroups.find((o) => {
      return o.name == `stage-${stageIndex}-key-${keyIndex}-radio-group`;
    });

    if (radioGroup) {
      radioGroup.writeValue(null);
    }
  }
}