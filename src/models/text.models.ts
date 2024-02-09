import {TextConstante} from "../app/text.constante";
import {inject} from "@angular/core";

export interface TextCreateSession {
  sessionCreatingTitle: string;
  sessionNameLabel : string
  sessionNamePlaceholder : string
  sessionTeamLabel : string
  sessionTeamPlaceholder : string
  sessionPrivateLabel : string
  sessionPrivatePlaceholder : string
  sessionMapLabel : string
  sessionMapPlaceholder : string
  sessionBtnLabel : string
}

export interface TextDefaultSession {
  name: string,
  password: string,
  mapId: number,
  teamOneName: string,
  teamTwoName: string,
  teamThreeName: string,
  teamFourName: string,
}


export class TextModels {

  private static textConstante: TextConstante = new TextConstante()

  static initTextCreateSession(): TextCreateSession{
    return {
        sessionCreatingTitle : this.textConstante.textUi.get('sessionCreatingTitle') ?? 'XXX',
        sessionNameLabel : this.textConstante.textUi.get('sessionNameLabel') ?? 'XXX',
        sessionNamePlaceholder : this.textConstante.textUi.get('sessionNamePlaceholder') ?? 'XXX',
        sessionTeamLabel : this.textConstante.textUi.get('sessionTeamLabel') ?? 'XXX',
        sessionTeamPlaceholder : this.textConstante.textUi.get('sessionTeamPlaceholder') ?? 'XXX',
        sessionPrivateLabel : this.textConstante.textUi.get('sessionPrivateLabel') ?? 'XXX',
        sessionPrivatePlaceholder : this.textConstante.textUi.get('sessionPrivatePlaceholder') ?? 'XXX',
        sessionMapLabel : this.textConstante.textUi.get('sessionMapLabel') ?? 'XXX',
        sessionMapPlaceholder : this.textConstante.textUi.get('sessionMapPlaceholder') ?? 'XXX',
        sessionBtnLabel : this.textConstante.textUi.get('sessionBtnLabel') ?? 'XXX'
    }
  }

  static initTextDefaultSession(): TextDefaultSession{
    return {
      name: this.textConstante.textUi.get('sessionNameDefault') ?? 'XXX',
      password: '',
      mapId: 1,
      teamOneName: this.textConstante.textUi.get('sessionTeamOneDefault') ?? 'XXX',
      teamTwoName: this.textConstante.textUi.get('sessionTeamTwoDefault') ?? 'XXX',
      teamThreeName: this.textConstante.textUi.get('sessionTeamThreeDefault') ?? 'XXX',
      teamFourName: this.textConstante.textUi.get('sessionTeamFourDefault') ?? 'XXX',
    }
  }
}
