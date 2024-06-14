import { Component, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';
import { Player } from '../players/player';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  static playerCount: number = 0;  
  players: Player[] = [];

  constructor(private storage: StorageService, private toastController: ToastController) {    
  }

  async add(input: IonInput): Promise<void> {
  
      if (input.value?.toString().trim() !== '') {
        const trimmedName = input.value!.toString().trim();
        const existingPlayer = this.players.find(player => player.name === trimmedName);
        if (existingPlayer){
          const toast = await this.toastController.create({
            message: 'Name already exists. Please choose another name.',
            duration: 2000, 
            position: 'top'
          });
          toast.present();          
          input.value = '';
          console.error('Name already exists');
          return;
        }
        const newPlayer = new Player(trimmedName);         
        this.players.push(newPlayer);       
        await this.storage.set("Players", this.players);
        PlayersPage.playerCount++;
      }
      else {
        const toast = await this.toastController.create({
          message: 'Cannot be empty',
          duration: 2000, 
          position: 'top'
        });
        toast.present();   
      }
    input.value = null;    
  }  

  async remove(player: Player): Promise<void> {
    const index = this.players.indexOf(player);
    if (index !== -1){
      this.players.splice(index, 1);
      await this.storage.set("Players", this.players);
    }
  }

  async ngOnInit(){
    this.players = await this.storage.getPlayers();

    console.warn(this.players);

    /*Alternative zu await 
      this.storage.get<string[]>()
        .then(playerNames => {
          // Daten aus den Storage erfolgreich gelesen wurden
          this.playerNames = playerNames ?? [];
        })
    */
  }

}
