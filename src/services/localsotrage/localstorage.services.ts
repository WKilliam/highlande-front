import {Injectable} from "@angular/core";
import {InfoGame} from "../../models/info.game.models";
import {UserModels} from "../../models/user.models";
import {GameModels} from "../../models/game.models";
import {MapModels} from "../../models/maps.models";

@Injectable({
  providedIn: 'root',
})
export class LocalstorageServices {


  createStorageByKey(key:string,data:any){
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getStorageByKey(key:string){
    return JSON.parse(localStorage.getItem(key) || '{}');
  }


  getStorageInfoGame(){
    return this.getStorageByKey('infoGame');
  }

  setStorageInfoGame(infoGame:InfoGame){
    this.createStorageByKey('infoGame', infoGame);
  }

  getStorageUser(){
    return this.getStorageByKey('user');
  }

  setStorageUser(user:UserModels){
    this.createStorageByKey('user', user);
  }

  getStorageGame(){
    return this.getStorageByKey('game');
  }

  setStorageGame(game:GameModels){
    this.createStorageByKey('game', game);
  }

  getStorageMap(){
    return this.getStorageByKey('map');
  }

  setStorageMap(map:MapModels){
    this.createStorageByKey('map', map);
  }

}
