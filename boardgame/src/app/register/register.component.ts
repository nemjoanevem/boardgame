import { HttpClientModule } from '@angular/common/http';
import { user } from './../objects';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  users = Array();
  newUser : user = new user;

  constructor() { }

  ngOnInit(): void {
    let fromStorage : any = JSON.parse(localStorage.getItem('users') || '{}') as user;
    for(const key in fromStorage){
      if (fromStorage.hasOwnProperty(key)){
        this.users.push(fromStorage[key]);
        }
    }
  }

  register(){
    //Ez a "register" oldalon lévő "registerButton" id-s gomb megnyomásakor történik.
    //Egy "User" object-et tölt fel a regisztráláskor megadott adatokkal
    //Ezt a user objectet lehet majd küldeni a DB-be
    //id-t meg a db-ben kap auto incrementel(gondolom)
    //A jelszót ascii kódként kapja meg a db (nem akartam bonyibbal szórakozni)
    this.newUser.name = (<HTMLInputElement>document.getElementById('name')).value;
    this.newUser.email = (<HTMLInputElement>document.getElementById('email')).value;
    let pw = (<HTMLInputElement>document.getElementById('password')).value;
    if(this.newUser.name.length > 3){
      if(this.emailValid(this.newUser.email)){
        if(this.loginCheck(this.newUser.name)){
          if(pw.length > 5){
            alert("Registration succeced!");
            this.newUser.password = this.passwordToAscii(pw);
            this.newUser.id = this.users.length+1;
            localStorage.setItem("newUser", JSON.stringify(this.newUser));

          }
          else alert("Password must contain at least 5 characters!");
        }
          else alert("Username is already taken!");
      }
      else alert("Email is invalid!");
    }
    else alert("Name must contain at least 3 characters!");
  }

  passwordToAscii(pw: any){ //Átalakítja a jelszót ascii karakterekké, hogy ne simán legyen tárolva a DB-ben
    const char = pw.split('');
    for(const i in char){
      char[i] = char[i].charCodeAt(0)+"a";
    }
    var string = char.join("");
    console.log(string);
    return string;
  }
  emailValid = (email : any) => { //Ellenőrzi, hogy az emailcim valid-e
    const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return emailRegex.test(email);

}
loginCheck(name : any){ //Megnézi, hogy a form-ra beírt login név szerepel-e a DB-ben
  const index = this.users.indexOf(this.users.find(x=> x.name === name));
  if (index != -1){
    return false;
  }
  else return true;
}
}
