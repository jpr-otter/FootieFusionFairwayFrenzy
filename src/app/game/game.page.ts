import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IonAccordion, IonInput, IonLabel } from '@ionic/angular';
import { Player } from '../players/player';
import { Score } from '../score/score';
import { Course } from '../game/course';
import { NavController } from '@ionic/angular';
const assetsBasePath = "./assets";

//comment for git commit

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  players: Player[] = [];  
  courses: Course[] = []; 
  currentCourse?: Course;
  public amountOfCourses: number = 18;
  currentImage: string = this.currentCourse?.thumbUrl ?? '';   

  constructor(private storage: StorageService) {}

  async modifyScore(scoreInput: IonInput, player: Player, score?: number) {
    player.setScore(Number(scoreInput.value) + (score ?? 0), this.currentCourse!.id);  
    console.log("HALLO");  
    await this.storage.set("Players", this.players);
  }

  async previousCourse() {
    const id = this.currentCourse!.id;
    if (id - 1 >= 0){
        this.currentCourse = this.courses[this.currentCourse!.id - 1];
    }
  }

  async nextCourse() {
    const id = this.currentCourse!.id;

    if (id + 1 < 18){
        this.currentCourse = this.courses[this.currentCourse!.id + 1];
        
    }
  }

  async ionViewDidEnter() {
    console.log("TEST");
    this.players = await this.storage.getPlayers(); 
    this.currentImage = this.currentCourse?.thumbUrl ?? '';   
  }
  
  onThumbnailHover() {
    this.currentImage = this.currentCourse?.imageUrl ?? '';
  }

  onThumbnailMouseOut() {
    this.currentImage = this.currentCourse?.thumbUrl ?? '';
  }

  async ngOnInit() {
    this.players = await this.storage.getPlayers();

    for (let index = 0; index < this.amountOfCourses; index++) {
      this.courses.push(new Course(index, (index + 1).toString()));      
      if (index === 0){
        this.currentCourse = this.courses[0];
      }
    }
  
  }

}
