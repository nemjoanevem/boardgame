import { user, game, event } from './../objects';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../main/main.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  users = Array();
  currentUser : user = new user;
  currentUserGames = Array();
  profileView : boolean;
  currentUserEvents = Array();

  ngOnInit(): void {
    //Feltölti a users tömböt userekkel
    let fromStorageUsers : any = JSON.parse(localStorage.getItem('users') || '{}') as user;
    for(const key in fromStorageUsers){
      if (fromStorageUsers.hasOwnProperty(key)){
        this.users.push(fromStorageUsers[key]);
        }
    }
    //Megnézi, hogy más profilját vagy a sajátunkat nézzük
    this.profileView = JSON.parse(localStorage.getItem('profileView') || '{}') as boolean;
    if(this.profileView){
      this.currentUser = JSON.parse(localStorage.getItem('currentLoginUser') || '{}') as user;
    }
    else{
      this.currentUser = JSON.parse(localStorage.getItem('organizerUser') || '{}') as user;
     
    }
    //Feltölti a játékokat amik a userhez tartoznak
    let fromStorage : any = this.currentUser.games;
    for(const key in fromStorage){
      if (fromStorage.hasOwnProperty(key)){
        this.currentUserGames.push(fromStorage[key]);
        }
      }
    let eventsFromStorage : any = JSON.parse(localStorage.getItem('currentUserJoinedEvents') || '{}') as event;
    for(const key in eventsFromStorage){
      if (eventsFromStorage.hasOwnProperty(key)){
        this.currentUserEvents.push(eventsFromStorage[key]);
        }
      }
  }

  editProfile(id: any){
    
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
    window.location.reload();
  }
}
