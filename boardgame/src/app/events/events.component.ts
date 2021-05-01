import { Router } from '@angular/router';
import { event, game } from './../objects';
import { Component, OnInit } from '@angular/core';
import { TmplAstBoundEvent } from '@angular/compiler';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./../main/main.component.css', './events.component.css']
})
export class EventsComponent implements OnInit {

  
  tmpGame : game = new game;
  games = Array();
  impEvent : event = new event;
  events = Array();

  /*Events-et kell feltölteni a DB-ből eventekkel  
    games-t pedig játékokkal
  
  */

  
  

 
  constructor(private _router : Router){}

  ngOnInit(): void {


    // példa
    this.impEvent.id = 1;
    this.impEvent.organizer = "Pelda Felhasznalo";
    this.impEvent.place = "Mohács";
    this.impEvent.langauge = "eng";
    this.impEvent.game = "Dark souls";
    this.impEvent.time = "06.20 14:00"

    this.tmpGame.name="Dark souls";
    this.tmpGame.id=1;
    this.tmpGame.bgg_score=7;
    this.tmpGame.thumbnail="https://cf.geekdo-images.com/mHQMnDL317AKXCt9LojYxw__opengraph/img/cq53gzADvxvxVU3JtRbgr4Jt6Y4=/fit-in/1200x630/filters:strip_icc()/pic3784353.jpg";
    
    let i = 0;
    while(i<10){
      i = i+1;
      this.impEvent.id = i+1;
      this.events.push(this.impEvent);
    }

    this.games.push(this.tmpGame);
    // példa


    /* pl így lehetne feltölteni az events-et

    for(const key in "db-s tömb amiben vannak az event objectek"){
      if ("db-s tömb amiben vannak az event objectek".hasOwnProperty(key)){
        this.events.push("db-s tömb amiben vannak az event objectek"[key]);
        }
    }

     */
  }

  viewBtn(id: any){

    /* Amelyik eventre kattintunk az az id alapján bekerül localstorage-ba
       Majd az ahhoz tartozó játék név alapján bekerül localStorage-ba */
    const index = this.events.indexOf(this.events.find(x=> x.id === id));
    if (index != -1){
        localStorage.setItem("currentEvent", JSON.stringify(this.events[index]));
        let currentGameName = this.events[index].game;
        const index2 = this.games.indexOf(this.games.find(x=> x.name === currentGameName));
        if (index != -1){
          localStorage.setItem("currentGame", JSON.stringify(this.games[index]));
        }
    }

    this._router.navigate(['eventView']);
  }

  logoff(){
    localStorage.setItem("validLogin", "false");
    window.location.reload();
  }

}
