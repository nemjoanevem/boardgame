import { event, user, game } from './../objects';
import { Component, OnInit } from '@angular/core';
import { mainModule } from 'node:process';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  eventsArray = Array();
  newEvent : event = new event;
  gamesArray = Array();


  ngOnInit(): void {
  }

  createNewEvent(){
    this.newEvent.game = (<HTMLInputElement>document.getElementById('game')).value;
    this.newEvent.place = (<HTMLInputElement>document.getElementById('place')).value;
    this.newEvent.time = (<HTMLInputElement>document.getElementById('time')).value;
    this.newEvent.maxPlayer = parseInt((<HTMLInputElement>document.getElementById('maxply')).value);
    
      

      let eventsFromStorage : any = JSON.parse(localStorage.getItem('events') || '{}') as event;
      for(const key in eventsFromStorage){
      if (eventsFromStorage.hasOwnProperty(key)){
        this.eventsArray.push(eventsFromStorage[key]);
        }
      }
      this.newEvent.id = this.eventsArray.length+1;
      let currentUser = JSON.parse(localStorage.getItem('currentLoginUser') || '{}') as user;
      this.newEvent.organizer = currentUser.name;
      this.newEvent.currentPlayer = 1;
      this.newEvent.langauge = "eng";

      if(this.checkGame(this.newEvent.game)){
        this.eventsArray.push(this.newEvent);
        localStorage.setItem('events', JSON.stringify(this.eventsArray));
      }
      else alert("Game not found");
      
  }

  checkGame(gameName : any){
      let gamesFromStorage : any = JSON.parse(localStorage.getItem('games') || '{}') as game;
      for(const key in gamesFromStorage){
      if (gamesFromStorage.hasOwnProperty(key)){
        this.gamesArray.push(gamesFromStorage[key]);
        }
      }
      const index = this.gamesArray.indexOf(this.gamesArray.find(x=> x.name === gameName));
      if (index != -1){
        return true;
      }
      else return false;
      


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
