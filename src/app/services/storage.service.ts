import { Injectable } from '@angular/core';
import { Player } from '../players/player';
import { Storage } from '@ionic/storage-angular';
import { PlayersPage } from '../players/players.page';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  async set(key: string, value: any): Promise<void> {
    if(!this._storage) await this.init();

    await this._storage?.set(key, value);    
  }

  async getPlayers(): Promise<Player[]> {
    if(!this._storage) await this.init();

    const players = ((await this._storage?.get("Players")) ?? []) as Player[];

    console.warn(players);

    return players.map(x => new Player(x))
  }
  
  /*async get<T>(key: string): Promise<T | undefined> {
    if(!this._storage) await this.init();

     return (await this._storage?.get(key)) as T;
  }*/

  public update(key: string, value: string[]): void {
    /*let listItems = await this.get(); 

    for (var item in value) {
      listItems.push(item);
    }
      blablabla
    this.set("PlayerNames", listItems);*/
  }
}