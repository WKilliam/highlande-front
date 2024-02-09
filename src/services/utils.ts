import {Injectable} from "@angular/core";
import {PlayerCardsEntity} from "../models/cards.player.entity.models";

@Injectable({
  providedIn: 'root',
})
export class Utils {
  static codeErrorChecking(code: number): boolean {
    return code < 200 || code > 299;
  }

  static playerNameCheck(team:PlayerCardsEntity){
    let playerOne : string = 'Player #'
    let playerTwo : string = 'Player #'

    if(team.cardsInfo === undefined){
      return {
        playerOne: 'Player #',
        playerTwo: 'Player #'
      }
    }else{
      team.cardsInfo.forEach((card,index) => {
        playerOne = (index === 0 ? card.player.pseudo : playerOne)
        playerTwo = (index === 1 ? card.player.pseudo : playerTwo)
      })
      return {
        playerOne: playerOne,
        playerTwo: playerTwo
      }
    }
  }
}
