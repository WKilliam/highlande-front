import {PlayerLobby} from "../models/player.models";
import {EntityPlaying} from "../models/room.content.models";
import {UserPosition} from "../models/users.models";

export class Utils {
  static indexLobbyPosition(
    lobbyPosition: Array<PlayerLobby>,
    pseudoToFind: string,
    avatarToFind: string): number {
    return lobbyPosition.findIndex(player => player.pseudo === pseudoToFind && player.avatar === avatarToFind);
  }

  static indexLobbyPositionCard(
    lobbyPosition: Array<PlayerLobby>,
    pseudoToFind: string,
    avatarToFind: string,
    cardToName:string,
    ): number {
    let index = lobbyPosition.findIndex(player => player.pseudo === pseudoToFind && player.avatar === avatarToFind);
    if(index !== -1){
      return lobbyPosition[index].cards.findIndex(card => card.name === cardToName)
    }else{
      return -1
    }
  }

  static findPlayerIndex(teams: Array<EntityPlaying>, pseudo: string, avatar: string): UserPosition {
    for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
      const team = teams[teamIndex];
      if (team.cardsPlayer) {
        for (let cardIndex = 0; cardIndex < team.cardsPlayer.length; cardIndex++) {
          const card = team.cardsPlayer[cardIndex];

          if (card.player?.pseudo === pseudo && card.player?.avatar === avatar) {
            return {
              teamTag: teamIndex,
              cardTag: cardIndex
            };
          }
        }
      } else {
        return {
          teamTag: teamIndex,
          cardTag: -1
        };
      }
    }
    return {
      teamTag: -1,
      cardTag: -1
    };
  }
}
