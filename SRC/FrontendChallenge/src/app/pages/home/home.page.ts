import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { TournamentKey } from 'src/app/models/tournament-key.model';
import { Tournament } from 'src/app/models/tournament.model';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  @ViewChild(MatStepper, { static: false }) stepper: MatStepper;

  /** Tournament form controls */
  public tournamentFormControls: { [key: string]: FormControl };
  /** Tournament form group */
  public tournamentFormGroup: FormGroup;
  
  /** Initial keys form controls */
  public initialKeysFormControls: Array<{ [key: string]: FormControl }> = [];
  /** Initial keys form group */
  public initialKeysFormGroup: FormGroup;

  /** Tournament object */
  public tournament: Tournament;

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  
  ngOnInit() {
    this.tournamentFormControls = {
      name: new FormControl(null, [ Validators.required ]),
      keys: new FormControl(4, [ Validators.required ])
    };

    this.tournamentFormGroup = this.formBuilder.group(this.tournamentFormControls);

    this.initialKeysFormGroup = this.formBuilder.group(this.initialKeysFormControls);
  }
  
  /**
   * Stepper selection change event
   * @param event Stepper event
   */
  stepperSelectionChange(event: any) {
    // If current step is 'Chaves iniciais' then build initial keys form controls
    if (event.selectedIndex == 1) {
      if (this.initialKeysFormControls.length < this.tournamentFormControls.keys.value) {
        let amount = this.tournamentFormControls.keys.value - this.initialKeysFormControls.length;

        for (let index = 0; index < amount; index++) {
          this.initialKeysFormControls.push(
            {
              team1: new FormControl(null, [Validators.required]),
              team2: new FormControl(null, [Validators.required])
            }
          );
        }
      } else if (this.initialKeysFormControls.length > this.tournamentFormControls.keys.value) {
        let amount = this.initialKeysFormControls.length - this.tournamentFormControls.keys.value;

        for (let index = 0; index < amount; index++) {
          this.initialKeysFormControls.pop();
        }
      }

      this.initialKeysFormGroup = this.formBuilder.group(this.initialKeysFormControls.map((o) => new FormGroup(o)));
    }
  }

  /**
   * Tournament step form submission
   * @param event Form event
   */
  onTournamentFormSubmit(event: any) {
    if (this.tournamentFormGroup.valid) {
      this.stepper.selected.completed = true;
      this.stepper.selected.editable = true;
      this.stepper.next();
    }
  }
  
  /**
   * Initial keys form submission
   * @param event Form event
   */
  onInitialKeysFormSubmit(event: any) {
    if (this.initialKeysFormGroup.valid) {
      this.createTournament();

      this.stepper.selected.completed = true;
      this.stepper.next();

      this.stepper.steps.forEach((step, index) => {
        if (index < 2) {
          step.editable = false;
        }
      });
    }
  }

  /**
   * Instantiate a Tournament based on input values
   */
  createTournament() {
    this.tournament = new Tournament();
    this.tournament.name = this.tournamentFormControls.name.value;
    this.tournament.keys = [];

    let initialKeys: Array<TournamentKey> = [];

    Object.values(this.initialKeysFormGroup.controls).forEach((formGroup: FormGroup) => {
      let tournamentKey = new TournamentKey();
      tournamentKey.team1 = formGroup.controls.team1.value;
      tournamentKey.team2 = formGroup.controls.team2.value;

      initialKeys.push(tournamentKey);
    });

    this.tournament.keys.push(initialKeys);
  }
}