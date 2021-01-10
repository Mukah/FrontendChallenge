import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TournamentManager } from './tournament-manager/tournament-manager.component';

@NgModule({
  declarations: [
    TournamentManager
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule
  ],
  exports: [
    TournamentManager,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule
  ]
})
export class ComponentsModule { }
