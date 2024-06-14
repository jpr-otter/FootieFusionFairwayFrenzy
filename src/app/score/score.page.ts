import { Component, OnInit } from '@angular/core';
import { Player } from '../players/player';
import { Course } from '../game/course';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  
  players: Player[] = [];  
  courses: Course[] = []; 
  currentCourse?: Course;
  public amountOfCourses: number = 18;

  constructor(private storage: StorageService) { }

  async ionViewDidEnter() {
    console.log("TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
    this.players = await this.storage.getPlayers();    
    this.sortPlayers();
    this.declareWinners(); 
  }

  sortPlayers() {
    this.players.sort((a,b) => a.calculateTotalScore() - b.calculateTotalScore());
  }
  
  isGameOver() {
    const amountOfFinishedPlayers = this.players.reduce((x, i) => x + (i.didThisPlayerCompleteAllCourses() == true ? 1 : 0), 0)
      return (amountOfFinishedPlayers == this.players.length)
  }

  declareWinners(){
    if(this.isGameOver()){
      this.sortPlayers();
      for (let i = 0; i < 3; i++){  
        if (this.players[i]) { 
          this.players[i].setPlayerRank(i === 0 ? "Winner" : (i === 1 ? "Second Place" : "Third Place"));
        }    
      }
    }
  } 

  async ngOnInit() {
    this.players = await this.storage.getPlayers();

    for (let index = 0; index < this.amountOfCourses; index++) {
      this.courses.push(new Course(index, (index + 1).toString()));      
      if (index === 0){
        this.currentCourse = this.courses[0];
      }
    } 
    this.sortPlayers();
    this.declareWinners();
  }

}
