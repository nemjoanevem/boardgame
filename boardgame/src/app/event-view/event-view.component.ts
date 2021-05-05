import { event, game, user } from './../objects';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./../main/main.component.css', './event-view.component.css']
})
export class EventViewComponent implements OnInit {

  constructor() { }

  users = Array(); //minden user ebben van
  currentUser : user = new user; // aktuálisan bejelenkezet user
  currentEvent : event = new event; // jelenleg tekintett event
  currentGame : game = new game; // jelenlegi eventhez tartozó game
  currentOrganizer : user = new user; //jelenlegi eventhez tartozó organizer
  currentUserEvents = Array(); //jelenlegi user által csatlakozott eventek
  currentlyJoinedPlayers = Array(); //jelenlegi eventhez csatlakozott userek


  ngOnInit(): void {
    // Megnyitáskor feltölti a usereket
    let fromStorageUsers : any = JSON.parse(localStorage.getItem('users') || '{}') as user;
    for(const key in fromStorageUsers){
      if (fromStorageUsers.hasOwnProperty(key)){
        this.users.push(fromStorageUsers[key]);
        }
    }


    this.currentEvent = JSON.parse(localStorage.getItem('currentEvent') || '{}') as event;
    this.currentGame = JSON.parse(localStorage.getItem('currentGame') || '{}') as game;


    const index = this.users.indexOf(this.users.find(x=> x.name === this.currentEvent.organizer));
      if (index != -1){
        this.currentOrganizer = this.users[index];
      }

    localStorage.setItem("organizerUser", JSON.stringify(this.currentOrganizer));
    localStorage.setItem("profileView", "false");
    
    this.currentlyJoinedPlayers = this.currentEvent.joinedPlayers;
    
  }

  join(){
    this.currentUser = JSON.parse(localStorage.getItem("currentLoginUser") || '{}') as user;


    if(this.currentEvent.currentPlayer < this.currentEvent.maxPlayer && this.joinCheck())
    {
      this.currentEvent.currentPlayer++;
      this.currentEvent.joinedPlayers.push(this.currentUser.name);
      localStorage.setItem('currentEvent', JSON.stringify(this.currentEvent));
      let eventsFromStorage : any = JSON.parse(localStorage.getItem('currentUserJoinedEvents') || '{}') as event;
      for(const key in eventsFromStorage){
      if (eventsFromStorage.hasOwnProperty(key)){
        this.currentUserEvents.push(eventsFromStorage[key]);
        }
      }
      this.currentUserEvents.push(this.currentEvent);
      localStorage.setItem('currentUserJoinedEvents', JSON.stringify(this.currentUserEvents));
      location.reload();
    }
    else alert("Event is full, or you already joind!");
    

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

  joinCheck(){
    const index = this.currentlyJoinedPlayers.indexOf(this.currentlyJoinedPlayers.find(x=> x === this.currentUser.name));
    if (index != -1){
      return false;
    }
    else return true;

  }

  setProfileView(name : any){
    const index = this.users.indexOf(this.users.find(x=> x.name === name));
    if (index != -1){
      this.currentOrganizer = this.users[index];
    }
    localStorage.setItem("organizerUser", JSON.stringify(this.currentOrganizer));
    localStorage.setItem("profileView", "false");
  }

}
