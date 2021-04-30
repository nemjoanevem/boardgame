import { user } from './../objects';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../main/main.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  currentUser : user = new user;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as user;
  }



  logoff(){
    localStorage.setItem("validLogin", "false");
    window.location.reload();
  }
}
