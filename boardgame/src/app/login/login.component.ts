import { user } from './../objects';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser : user = new user;

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
      
      localStorage.setItem("validLogin", "true");
      console.log("nice");
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