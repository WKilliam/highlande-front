import {Teams} from "./teams";
import {PlayersModel} from "./players.model";

const player1: PlayersModel = {
  id: 1,
  name: "",
  currentHp: 100,
  avatar: "",
  maxHp: 100,
  card: {
    id: 1,
    name: "",
    description: "",
    image: "https://cdn.discordapp.com/attachments/1060501071056879618/1161721523619516476/kyrasw_black_knight_of_judgment_with_demonic_armor_and_displayi_3ee9a52e-1f78-4c45-9a79-948c78fc25ac.png?ex=6539547a&is=6526df7a&hm=fdaaa8b6a02f6aa2d9b3609802b050b23c02d1ceb407954997473d7b39017745&",
    rarity: "commun",
    atk: 10, // Valeur d'attaque du joueur 1
    def: 5,  // Valeur de défense du joueur 1
    spd: 7,  // Valeur de vitesse du joueur 1
    luk: 3,  // Valeur de chance du joueur 1
    effects: []
  }
}

const player2: PlayersModel = {
  id: 3,
  name: "",
  avatar: "",
  currentHp: 100,
  maxHp: 100,
  card: {
    id: 1,
    name: "",
    description: "",
    image: "https://cdn.discordapp.com/attachments/1060501071056879618/1162384218106634350/kyrasw_wings_knight_of_judgment_with_demonic_armor_and_displayi_4a7b0c8d-294b-446c-851f-bfd9d3f02f7e.png?ex=653bbda9&is=652948a9&hm=ec01d77da954910cf42edcf9c442b3e5031ad5ba1d91c46a50b27954579d78d7&",
    rarity: "legendary",
    atk: 10,
    def: 5,
    spd: 7,
    luk: 3,
    effects: []
  }
}

export const DATATEAM: Teams = {
  characterTeam: "team1",
  teamName: "Les Highlanders",
  teamMaxLife: player1.maxHp + player2.maxHp,
  player1: player1,
  player2: player2,
  teamAtk: player1.card.atk + player2.card.atk,
  teamDef: player1.card.def + player2.card.def,
  teamSpd: player1.card.spd + player2.card.spd,
  teamLuk: player1.card.luk + player2.card.luk,
  teamLife: player1.currentHp + player2.currentHp,
};
