import { user, game } from './../objects';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users = Array();
  loginUser : user = new user;


  pathUsers = './../../../assets/users.txt';
  pathGames = './../../../assets/games.txt';
  pathEvents = './../../../assets/events.txt';
  

  constructor(private http: HttpClient) {  //Betöltöm a db-ből az adatokat localstorage-be
    this.http.get(this.pathUsers).toPromise().then((users: any) => {
    this.saveItemsInLocalStorage("users", users);
    });
    this.http.get(this.pathGames).toPromise().then((games: any) => {
    this.saveItemsInLocalStorage("games", games);
    });
    this.http.get(this.pathEvents).toPromise().then((events: any) => {
    this.saveItemsInLocalStorage("events", events);
    });
  }

  ngOnInit(): void {
    const newUser: any = JSON.parse(localStorage.getItem('newUser') || '{}') as user;
    const NewUserId: any = newUser.id;
    const i = this.users.indexOf(this.users.find(x=> x.id === NewUserId));
    if (i === -1 && NewUserId != null){
      this.users.push(newUser);
    }
    localStorage.removeItem("newUser");

    let fromStorage : any = JSON.parse(localStorage.getItem('users') || '{}') as user;
    for(const key in fromStorage){
      if (fromStorage.hasOwnProperty(key)){
        this.users.push(fromStorage[key]);
        }
    }

    this.saveItemsInLocalStorage("users", this.users);

  }

  login(){

    // localStorage.setItem("validLogin", "false"); Ha ez false akkor nem enged be az oldalra
    //                                              Ha true akkor beenged

    let login = (<HTMLInputElement>document.getElementById('login')).value;
    let pwFromLogin = (<HTMLInputElement>document.getElementById('password')).value;
    if(login.length > 3 && pwFromLogin.length > 5 /* emailValid(login) -> Ha emailes a login */){ //Ha megfelelő a karakterek száma
      if(this.loginCheck(login)){ //Ha létezik a felhasználónév
        if(this.pwCheck(pwFromLogin)){ //Ha jó a felhasználónévhez tartozó jelszó
          localStorage.setItem("validLogin", "true");
        }
        else{
          alert("Incorrect password!");
          localStorage.setItem("validLogin", "false");
        }
      }
      else{
        alert("Name not found!")
        localStorage.setItem("validLogin", "false");
      }
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

  asciiToString(asciipw: any){ //Jelszó a DB-ben scii kódként van tárolva, így alakítjuk vissza
    const char = asciipw.split('a');
    for(const i in char){
      char[i] = String.fromCharCode(char[i]);
    }
    var string = char.join("");
    return string;
  }

  loginCheck(name : any){ //Megnézi, hogy a form-ra beírt login név szerepel-e a DB-ben
    const index = this.users.indexOf(this.users.find(x=> x.name === name));
    if (index != -1){
      localStorage.setItem("currentLoginUser", JSON.stringify(this.users[index]));
      return true;
    }
    return false;
}

  pwCheck(pw : any){ //Megnézi, hogy az adott névhez megfelelő jelsó lett-e beírva
    let user : any = JSON.parse(localStorage.getItem('currentLoginUser') || '{}') as user;
    if(this.asciiToString(user.password).localeCompare(pw) == 0){
      return true;
    }
    else{
      return false;
    }
  }
  saveItemsInLocalStorage(titleInLocalStorage : any, whatToSave : any){
    for (const key in whatToSave){
      if (whatToSave.hasOwnProperty(key)){
        localStorage.setItem(titleInLocalStorage, JSON.stringify(whatToSave))
      }
    }
  }
 }
