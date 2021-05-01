import { user, game } from './../objects';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUserGames = Array(); //Ezt fel kell tölteni majd az adott user játékaival DB-ből lekérdezéssel
  loginUser : user = new user;
  tmpGame : game = new game;

  constructor() { }

  ngOnInit(): void {
  }

  login(){

    // localStorage.setItem("validLogin", "false"); Ha ez false akkor nem enged be az oldalra
    //                                              Ha true akkor beenged

    let login = (<HTMLInputElement>document.getElementById('login')).value;
    let pwFromLogin = (<HTMLInputElement>document.getElementById('password')).value;
    if(login.length > 3 && pwFromLogin.length > 5 /* emailValid(login) -> Ha emailes a login */){
      /* if(van match DB-ben a login-ra){

        itt ki kell kérni a db-ből a loginhoz tartozó jelszót, utána bedobni a függvénybe
        pl:
        pwFromDB = password.from.db;

        if(this.asciiToString(pwFromDB) === pwFromLogin){
          Ekkor enged csak be az oldalra
          és itt kellene még localstorage-be tárolni a jelnelegi felhasználót id szerint
          ami alapján majd elérjük, hogy neki milyen játékai vannak stb.

          localStorage.setItem("validLogin", "true");
          localStorage.setItem("currentUser", JSON.stringify(this.loginUser));
          így kerülhetnek majd localstorage-ba az adott userhez tartozó játékok-> localStorage.setItem("currentUserGames", JSON.stringify(this.currentUserGames));
        }
        else{
          alert("Incorrect password!");
          localStorage.setItem("validLogin", "false");
        };

      }
      else{
        alert("Incorrect name");
        localStorage.setItem("validLogin", "false");
          }; */


      //Ez csak próba, majd törölni kell
      this.loginUser.id = 1;
      this.loginUser.email = "proba@email.cim";
      this.loginUser.name = "proba nev";
      this.loginUser.gender = "male";
      this.loginUser.city = "Kölked";
      localStorage.setItem("validLogin", "true");
      localStorage.setItem("currentUser", JSON.stringify(this.loginUser));
      this.tmpGame.name = "Dark souls";
      this.currentUserGames[0] = this.tmpGame.name;
      this.tmpGame.name = "asd";
      this.currentUserGames[1] = this.tmpGame.name;
      localStorage.setItem("currentUserGames", JSON.stringify(this.currentUserGames));
      //Ez csak próba, majd törölni kell

      
    }
    else{
      alert("Incorrect login!");
      localStorage.setItem("validLogin", "false");
        };
  }

  //Ez akkor kell, ha a login email-es
  /*emailValid = (email : any) => {
    const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return emailRegex.test(email);
  }*/

  asciiToString(asciipw: any){
    const char = asciipw.split('a');
    for(const i in char){
      char[i] = String.fromCharCode(char[i]);
    }
    var string = char.join("");
    return string;
  }
}
