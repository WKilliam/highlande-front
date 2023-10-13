import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreServices} from "../../services/store/store.services";
import {MapsModels} from "../../models/maps.models";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'ui-create-session',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-session.ui.html',
  styleUrls: ['./create-session.ui.scss']
})
export class CreateSessionUi implements OnInit {

  showPasswordField: boolean = false;
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
    const nameSession = this.formCreateSession.get('nameSession')?.value;
    const type = this.formCreateSession.get('type')?.value;
    const password = this.formCreateSession.get('password')?.value;
    const map = this.formCreateSession.get('map')?.value;
    const teamOne = this.formCreateSession.get('teamOne')?.value;
    const teamTwo = this.formCreateSession.get('teamTwo')?.value;
    const teamThree = this.formCreateSession.get('teamThree')?.value;
    const teamFour = this.formCreateSession.get('teamFour')?.value;
    const body = {
      nameSession,
      type,
      password,
      map,
      teamOne,
      teamTwo,
      teamThree,
      teamFour
    }
    if (body.type === 'public' || body.type === '') {
      this.store.createSession(body)
    }else{
      console.log("body", body)
    }
  }
}
