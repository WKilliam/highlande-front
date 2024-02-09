import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TextConstante {

  textUi: Map<string, string> = new Map<string, string>([
    ['goToSession', 'Go to Sessionn'],
    ['login', 'Login'],

    ['sessionCreatingTitle', 'Session name'],

    ['sessionNameLabel', 'Session name of your adventure'],
    ['sessionNamePlaceholder', 'Last Adventure'],

    ['sessionTeamLabel', 'Name of the team :'],
    ['sessionTeamPlaceholder', 'The Red Pickles'],

    ['sessionPrivateLabel', 'Whrite a password for your session if you want it to be private'],
    ['sessionPrivatePlaceholder', 'Password123'],

    ['sessionMapLabel', 'Select a map for your session'],
    ['sessionMapPlaceholder', 'Island of the lost'],

    ['sessionBtnLabel', 'Create the session'],

    ['Start','Start Game'],

    ['sessionNameDefault', 'NO NAME'],
    ['sessionTeamOneDefault', 'Alpha'],
    ['sessionTeamTwoDefault', 'Beta'],
    ['sessionTeamThreeDefault', 'Charlie'],
    ['sessionTeamFourDefault', 'Delta'],



  ])
}
