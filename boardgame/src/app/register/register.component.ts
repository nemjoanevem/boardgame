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

  newUser : user = new user;

  constructor() { }

  ngOnInit(): void {
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
        /* if(a név és email cim nincs benne a db-ben {*/
          if(pw.length > 5){
            alert("Registration succeced!");
            this.newUser.password = this.passwordToAscii(pw);
            /* this.newUser -> DB */
          }
          else alert("Password must contain at least 5 characters!");

        /*}
          else alert("Username or Email is already taken!");*/
      }
      else alert("Email is invalid!");
    }
    else alert("Name must contain at least 3 characters!");
  }

  passwordToAscii(pw: any){
    const char = pw.split('');
    for(const i in char){
      char[i] = char[i].charCodeAt(0)+"a";
    }
    var string = char.join("");
    return string;
  }
  emailValid = (email : any) => {
    const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return emailRegex.test(email);
}
}
