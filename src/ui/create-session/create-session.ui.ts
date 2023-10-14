import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreServices} from "../../services/store/store.services";
import {MapsModels} from "../../models/maps.models";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SessionModelRequest, StatusGame} from "../../models/sessions";

@Component({
  selector: 'ui-create-session',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-session.ui.html',
  styleUrls: ['./create-session.ui.scss']
})
export class CreateSessionUi implements OnInit {

  showPasswordField: boolean = false;
  isError: boolean = false;
  readonly store = inject(StoreServices)
  formCreateSession = new FormGroup({
    nameSession: new FormControl(''),
    type: new FormControl(''),
    password: new FormControl(''),
    map: new FormControl(''),
    teamOne: new FormControl(''),
    teamTwo: new FormControl(''),
    teamThree: new FormControl(''),
    teamFour: new FormControl(''),
  })

  togglePasswordField(event: any) {
    const selectedOption = event.target.value;
    this.showPasswordField = selectedOption === 'private';
  }
  maps: Array<MapsModels> = [];

  ngOnInit(): void {
    this.pullMaps()
  }

  pullMaps() {
    this.store.getAllMaps().subscribe((maps: Array<MapsModels>) => {
      this.maps = maps;
    })
  }

  onStartButtonClick() {
    const nameSession = this.formCreateSession.get('nameSession')?.value as string;
    const type = this.formCreateSession.get('type')?.value as string;
    const password = this.formCreateSession.get('password')?.value as string;
    const map = this.formCreateSession.get('map')?.value as string;
    const teamOne = this.formCreateSession.get('teamOne')?.value as string;
    const teamTwo = this.formCreateSession.get('teamTwo')?.value as string;
    const teamThree = this.formCreateSession.get('teamThree')?.value as string;
    const teamFour = this.formCreateSession.get('teamFour')?.value as string;

    const sessionModelRequest: SessionModelRequest = {
      ownerId: 1,
      name: nameSession,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      statusAccess: ( type === 'public' || type === '') ? StatusGame.PUBLIC : StatusGame.PRIVATE,
      password: password,
      mapId: map === '' ? -1 : parseInt(map),
      teamNameOne: teamOne,
      teamNameTwo: teamTwo,
      teamNameThree: teamThree,
      teamNameFour: teamFour,
    }
    if (
      sessionModelRequest.name !== '' &&
      type !== '' &&
      sessionModelRequest.mapId !== -1 &&
      sessionModelRequest.teamNameOne !== '' &&
      sessionModelRequest.teamNameTwo !== '' &&
      sessionModelRequest.teamNameThree !== '' &&
      sessionModelRequest.teamNameFour !== ''
    ) {
      if(sessionModelRequest.statusAccess === StatusGame.PRIVATE &&
        sessionModelRequest.password === ''){
        this.isError = true;
        console.log('error fields password is empty')
      }else if (sessionModelRequest.statusAccess === StatusGame.PRIVATE &&
        sessionModelRequest.password !== ''){
        this.store.postCreateSession(sessionModelRequest).subscribe((res) => {
          console.log(res)
        })
      }else{
        this.store.postCreateSession(sessionModelRequest).subscribe((res) => {
          console.log(res)
        })
      }
    } else {
      this.isError = true;
      console.log('error fields empty')
    }
  }
}
