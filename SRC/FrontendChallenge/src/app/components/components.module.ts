import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TournamentViewer } from './tournament-viewer/tournament-viewer.component';

@NgModule({
  declarations: [
    TournamentViewer
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule
  ],
  exports: [
    TournamentViewer,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule
  ]
})
export class ComponentsModule { }
