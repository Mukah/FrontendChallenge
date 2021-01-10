import { Component } from '@angular/core';

@Component({
  selector: 'tournament-viewer',
  templateUrl: './tournament-viewer.component.html',
  styleUrls: ['./tournament-viewer.component.scss'],
  host: { class: 'tournament-viewer' }
})
export class TournamentViewer {
  constructor() { }

  ngOnInit() {
  }
}