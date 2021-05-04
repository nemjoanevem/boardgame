import { event, game, user } from './../objects';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./../main/main.component.css', './event-view.component.css']
})
export class EventViewComponent implements OnInit {

  constructor() { }

  users = Array();
  currentEvent : event = new event;
  currentGame : game = new game;
  currentOrganizer : user = new user;
  currentUserEvents = Array();


  ngOnInit(): void {
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
        console.log(this.currentOrganizer);
      }

    localStorage.setItem("organizerUser", JSON.stringify(this.currentOrganizer));
    localStorage.setItem("profileView", "false");
  }

  join(){
    if(this.currentEvent.currentPlayer < this.currentEvent.maxPlayer)
    {
      this.currentEvent.currentPlayer++;
      localStorage.setItem('currentEvent', JSON.stringify(this.currentEvent));
      let eventsFromStorage : any = JSON.parse(localStorage.getItem('currentUserJoinedEvents') || '{}') as event;
      for(const key in eventsFromStorage){
      if (eventsFromStorage.hasOwnProperty(key)){
        this.currentUserEvents.push(eventsFromStorage[key]);
        }
      }
      this.currentUserEvents.push(this.currentEvent);
      localStorage.setItem('currentUserJoinedEvents', JSON.stringify(this.currentUserEvents));
    }
    else alert("Event is full!");
    

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
