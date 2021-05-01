import { user, game } from './../objects';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../main/main.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  currentUser : user = new user;
  currentUserGames = Array();

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as user;
    let fromStorage : any = JSON.parse(localStorage.getItem('currentUserGames') || '{}') as game;
    for(const key in fromStorage){
      if (fromStorage.hasOwnProperty(key)){
        this.currentUserGames.push(fromStorage[key]);
        }
      }
  }

  editProfile(id: any){
    
  }

  logoff(){
    localStorage.setItem("validLogin", "false");
    window.location.reload();
  }
}
