import { Router } from '@angular/router';
import { event, game } from './../objects';
import { Component, OnInit } from '@angular/core';
import { TmplAstBoundEvent } from '@angular/compiler';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./../main/main.component.css', './events.component.css']
})
export class EventsComponent implements OnInit {

  
  tmpGame : game = new game;
  games = Array();
  impEvent : event = new event;
  events = Array();

  /*Events-et kell feltölteni a DB-ből eventekkel  
    games-t pedig játékokkal
  
  */

  
  

 
  constructor(private _router : Router){}

  ngOnInit(): void {
    let fromStorageEvt : any = JSON.parse(localStorage.getItem('events') || '{}') as event;
    for(const key in fromStorageEvt){
      if (fromStorageEvt.hasOwnProperty(key)){
        this.events.push(fromStorageEvt[key]);
        }
    }
    let fromStorageGames : any = JSON.parse(localStorage.getItem('games') || '{}') as game;
    for(const key in fromStorageGames){
      if (fromStorageGames.hasOwnProperty(key)){
        this.games.push(fromStorageGames[key]);
        }
    }

    const updatedItem: any = JSON.parse(localStorage.getItem('currentEvent') || '{}') as event;
    const updatedItemId: any = updatedItem.id;

    const index = this.events.indexOf(this.events.find(x=> x.id === updatedItemId));
    if (index != -1){
      this.events[index] = updatedItem;
    }

  }

  viewBtn(id: any){

    /* Amelyik eventre kattintunk az az id alapján bekerül localstorage-ba
       Majd az ahhoz tartozó játék név alapján bekerül localStorage-ba */
    const index = this.events.indexOf(this.events.find(x=> x.id === id));
    if (index != -1){
        localStorage.setItem("currentEvent", JSON.stringify(this.events[index]));
        let currentGameName = this.events[index].game;
        const index2 = this.games.indexOf(this.games.find(x=> x.name === currentGameName));
        if (index2 != -1){
          localStorage.setItem("currentGame", JSON.stringify(this.games[index2]));
        }
    }

    this._router.navigate(['eventView']);
  }

  logoff(){
    localStorage.removeItem("organizerUser");
    localStorage.removeItem("currentEvent");
    localStorage.removeItem("currentGame");
    localStorage.removeItem("currentUserEvent");
    localStorage.removeItem("currentUserJoinedEvents");
    localStorage.removeItem("currentLoginUser");
    localStorage.setItem("validLogin", "false");
    window.location.reload();
  }

  profile(){
    localStorage.setItem("profileView", "true");
  }

  

}
