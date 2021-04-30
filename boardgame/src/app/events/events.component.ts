import { event } from './../objects';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./../main/main.component.css', './events.component.css']
})
export class EventsComponent implements OnInit {

  impEvent : event = new event;
  events : event[] = new Array();

  /*Events-et kell feltölteni a DB-ből eventekkel  
    
  
  */
  

  constructor() { }

  ngOnInit(): void {


    // példa
    this.impEvent.id = 1;
    this.impEvent.organizer = "Pelda Felhasznalo";
    this.impEvent.place = "Mohács";
    this.impEvent.langauge = "eng";
    let i = 0;
    while(i<10){
      i = i+1;
      this.events.push(this.impEvent);
    }

    /* pl így lehetne feltölteni az events-et
    for(const key in "db-s tömb amiben vannak az event objectek"){
      if ("db-s tömb amiben vannak az event objectek".hasOwnProperty(key)){
        this.events.push("db-s tömb amiben vannak az event objectek"[key]);
        }
    }
     */

    
    


  }

  logoff(){
    localStorage.setItem("validLogin", "false");
    window.location.reload();
  }

}
