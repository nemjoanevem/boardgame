import { event, game } from './../objects';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./../main/main.component.css', './event-view.component.css']
})
export class EventViewComponent implements OnInit {

  constructor() { }

  currentEvent : event = new event;
  currentGame : game = new game;

  ngOnInit(): void {
    this.currentEvent = JSON.parse(localStorage.getItem('currentEvent') || '{}') as event;
    this.currentGame = JSON.parse(localStorage.getItem('currentGame') || '{}') as game;
  }

  join(){
    //Ehhez kéne az adatbázis, hogy megtudjam írni
  }

  logoff(){
    localStorage.setItem("validLogin", "false");
    window.location.reload();
  }

}
