import { Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatRadioGroup } from '@angular/material';
import { SwiperComponent, SwiperConfig, SwiperDirective } from 'ngx-swiper-wrapper';
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
  @ViewChild(SwiperDirective, { static: false }) swiper: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) swiper2: SwiperComponent;
  @ViewChildren(MatRadioGroup) radioGroups: QueryList<MatRadioGroup>;

  @Input() tournament: Tournament;

  @Output() change: EventEmitter<Team> = new EventEmitter<Team>();

  public config: SwiperConfig;

  public winner: Team;

  constructor() { }

  ngOnInit() {
    this.config = new SwiperConfig({
      slidesPerView: 2.5,
      centeredSlides: true,
      breakpoints: {
        767: {
          slidesPerView: 1.2
        }
      }
    });
  }

  onKeyChange(event: any, stageIndex: number, keyIndex: number) {
    // If isn't last stage (not winner stage)
    if ((stageIndex + 1) < this.totalStages) {
      let nextStageKeyIndex = (keyIndex % 2 == 0) ? keyIndex / 2 : (keyIndex - 1) / 2;

      if (!this.tournament.keys[stageIndex + 1]) this.tournament.keys[stageIndex + 1] = [];
      if (!this.tournament.keys[stageIndex + 1][nextStageKeyIndex]) this.tournament.keys[stageIndex + 1][nextStageKeyIndex] = new TournamentKey();

      // Fill the tournament key with both teams
      if (keyIndex % 2 == 0) {
        this.tournament.keys[stageIndex + 1][nextStageKeyIndex].team1 = event.value;
      } else {
        this.tournament.keys[stageIndex + 1][nextStageKeyIndex].team2 = event.value;
      }

      // Reset next stage radio buttons
      for (let i = 0; i < this.tournament.keys[stageIndex + 1].length; i++) {
        this.resetRadioButtonGroup(stageIndex + 1, i);
      }

      // Clear invalid stages
      for (let i = stageIndex + 2; i < this.tournament.keys.length; i++);

      // Goto next stage slide
      if (!this.tournament.keys[stageIndex + 1].find((o) => !o.team1 || !o.team2)) {
        this.swiper.setIndex(stageIndex + 1);
      }
      
      this.winner = null;
      
    } else { // When we have a winner
      this.swiper.setIndex(stageIndex + 1);

      this.winner = event.value;
    }
  
    // Update Swiper slider
    this.swiper.update();

    // Emit change event
    this.change.emit(this.winner);
  }

  get totalStages(): number {
    return (Math.log(this.tournament.keys[0].length) / Math.log(2)) + 1;
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