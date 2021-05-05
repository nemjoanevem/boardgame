import { user, game, event } from './../objects';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../main/main.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  games = Array();
  users = Array();
  currentUser : user = new user;
  currentUserGames = Array();
  profileView : boolean;
  currentUserEvents = Array();
  editProfileBool : boolean;

  ngOnInit(): void {
    //Feltölti a games tömböt játékokkal
    let fromStorageGames : any = JSON.parse(localStorage.getItem('games') || '{}') as game;
    for(const key in fromStorageGames){
      if (fromStorageGames.hasOwnProperty(key)){
        this.games.push(fromStorageGames[key]);
        }
    }

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

    this.editProfileBool = false;
  }

  editProfile(){
    this.editProfileBool = true;
  }
  editProfileSave(id: any){



    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let city = (<HTMLInputElement>document.getElementById('place')).value;
    let gender = (<HTMLInputElement>document.getElementById('sex')).value;
    let game = (<HTMLInputElement>document.getElementById('game')).value;
    
    if(this.emailValid(email)){
      this.currentUser.email = email
    }
    if(city != "" && city != null){
      this.currentUser.city = city;
    }
    if(gender != null && gender != ""){
      this.currentUser.gender = gender;
    }
    if(game != null && this.gameCheck(game)){
    this.currentUserGames.push(game);
    this.currentUser.games = this.currentUserGames;
    }
    console.log(this.currentUser);
    localStorage.setItem("currentLoginUser", JSON.stringify(this.currentUser));

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
  emailValid = (email : any) => { //Ellenőrzi, hogy az emailcim valid-e
    const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return emailRegex.test(email);

}
gameCheck(game : any){ //Megnézi, hogy a játék amit hozzá akarunk adni a user-hez, az megvan-e már neki
  const index = this.currentUserGames.indexOf(this.currentUserGames.find(x=> x === game));
  if (index != -1){
    return false;
  }
  else{
    console.log(this.currentUserGames);
    return true;
    
}
}

}
