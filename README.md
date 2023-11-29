this.setTimerValue(this.getTimerValue() - 1)
switch (this.getTurnStatus()) {
case Can.START:
if(this.localStore.getSessionStatusGame().entityTurn.length === 0){
this.storeSocket.createTurnList()
this.storeSocket.whoIsTurn()
}else{
this.storeSocket.whoIsTurn()
}
break;
case Can.SEND_DICE:
if(this.localStore.getCurrentTurn().turnEntity.typeEntity === 'HUMAIN'){
const teamName = this.localStore.getGame().teams[this.localStore.getPlayerPosition().teamTag].name
const cardContent = this.localStore.getGame().teams[this.localStore.getPlayerPosition().teamTag].cardsPlayer ?? []
const nameUser =  cardContent[this.localStore.getPlayerPosition().cardTag]?.player?.pseudo ?? ''
if(nameUser !== '' && this.localStore.getSessionStatusGame().entityTurn[0].pseudo === `${teamName}-${nameUser}`){
this.setHiddenDice(true)
const diceResult = this.getDiceResult();
if (diceResult !== -1 && this.getTimerValue() > 0) {
let currentTurn = {
...this.localStore.getCurrentTurn(),
dice: this.getDiceResult(),
};
this.storeSocket.sendDice(currentTurn);
this.setallCanMovePosition(this.localStore.getCurrentTurn().moves)
if(this.localStore.getCurrentTurn().moves.length !== 0){
this.switchStatusByCurrentStatus()
}
}
}
}else{
this.roollingDice()
let currentTurn = {
...this.localStore.getCurrentTurn(),
dice: this.getDiceResult(),
};
this.storeSocket.sendDice(currentTurn);
if(this.localStore.getCurrentTurn().moves.length !== 0){
this.switchStatusByCurrentStatus()
}
}
break
case Can.CHOOSE_MOVE:
if(this.localStore.getCurrentTurn().turnEntity.typeEntity === 'HUMAIN'){
const teamName = this.localStore.getGame().teams[this.localStore.getPlayerPosition().teamTag].name
const cardContent = this.localStore.getGame().teams[this.localStore.getPlayerPosition().teamTag].cardsPlayer ?? []
const nameUser =  cardContent[this.localStore.getPlayerPosition().cardTag]?.player?.pseudo ?? ''
if(nameUser !== '' && this.localStore.getSessionStatusGame().entityTurn[0].pseudo === `${nameUser}-${teamName}`){
this.setHiddenDice(false)
const moving = this.getMove()
if (moving.id !== -1 && this.getTimerValue() > 0) {
let currentTurn = {
...this.localStore.getCurrentTurn(),
move: this.getMove(),
};
this.storeSocket.chooseMove(currentTurn);
if(this.getMove().id !== -1){
this.switchStatusByCurrentStatus()
}
}
}
}else{
this.storeSocket.chooseMove(this.localStore.getCurrentTurn());
if(this.localStore.getCurrentTurn().move.id !== -1){
this.switchStatusByCurrentStatus()
}
}
break;
case Can.MOVE:
let characters = this.getCharacters()
if(this.localStore.getSessionStatusGame().entityTurn[0].typeEntity === 'HUMAIN'){
const name = this.localStore.getSessionStatusGame().entityTurn[0].pseudo.split('-')[0]
if(characters.findIndex((character) => character.pseudo === name) !== -1){
let index = characters.findIndex((character) => character.pseudo === name)
this.move(this.getMove(),index)
if(this.getMove().id !== -1){
this.switchStatusByCurrentStatus()
}
}
}else if(this.localStore.getSessionStatusGame().entityTurn[0].typeEntity === 'COMPUTER'){
const name = this.localStore.getSessionStatusGame().entityTurn[0].pseudo
if(characters.findIndex((character) => character.pseudo === name) !== -1){
let index = characters.findIndex((character) => character.pseudo === name)
this.move(this.localStore.getCurrentTurn().move,index)
}
}
break;
case Can.END_MOVE:
if(this.nowPositionSignal()){
console.log('end move')
this.setallCanMovePosition([])
this.setDiceResult(-1)
this.setMove({id: -1, x: -1, y: -1, value: 0,})
// this.storeSocket.endMove(this.localStore.getCurrentTurn())
this.switchStatusByCurrentStatus()
}else{
console.log('wait')
}
break;
case Can.END_TURN:
this.switchStatusByCurrentStatus()
break;
}
