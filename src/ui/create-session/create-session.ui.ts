import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreServicesApi} from "../../services/store-Api/store.services.api";
import {MapsModels} from "../../models/maps.models";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SessionModelRequest, StatusGame} from "../../models/sessions";
import {PartiesModelsJson} from "../../models/parties.models";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";
import {UserModels} from "../../models/user.models";
import {FormatModel} from "../../models/format.model";
import {Router} from "@angular/router";

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
  readonly storeServicesApi = inject(StoreServicesApi)
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
  @Output() onInitSession: EventEmitter<any> = new EventEmitter();
  local = inject(LocalstorageServices)
  user = this.local.getUser()
  private router = inject(Router)

  togglePasswordField(event: any) {
    const selectedOption = event.target.value;
    this.showPasswordField = selectedOption === 'private';
  }

  maps: Array<MapsModels> = [];

  ngOnInit(): void {
    this.pullMaps()
  }

  pullMaps() {
    this.storeServicesApi.getAllMaps().subscribe((received: FormatModel) => {
      if (received.code >= 200 && received.code < 300) {
        this.maps = received.data
      }else{
        console.log(`code : ${received.code} , data : ${received.data} , message : ${received.message}`)
      }
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
    const user = this.local.getUser()
    let userModels: UserModels = JSON.parse(user?.toString() ?? '{}')
    const sessionModelRequest: SessionModelRequest = {
      ownerId: userModels.id,
      name: nameSession,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      statusAccess: (type === 'public' || type === '') ? StatusGame.PUBLIC : StatusGame.PRIVATE,
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
      if (sessionModelRequest.statusAccess === StatusGame.PRIVATE &&
        sessionModelRequest.password === '') {
        this.isError = true;
        console.log('error fields password is empty')
      } else if (sessionModelRequest.statusAccess === StatusGame.PRIVATE &&
        sessionModelRequest.password !== '') {
        this.createSession(sessionModelRequest)
      } else {
        this.createSession(sessionModelRequest)
      }
    } else {
      this.isError = true;
      console.log('error fields empty')
    }
  }

  createSession(sessionModelRequest: SessionModelRequest) {
    this.storeServicesApi.postCreateSession(sessionModelRequest).subscribe((received: FormatModel) => {
      if(received.code >= 200 && received.code < 300){
        this.initData(received.data)
        this.initSession()
        this.router.navigateByUrl(`/lobby/${received.data.infoGame.gameKeySession.key}`);
      }else{
        console.log(`code : ${received.code} , data : ${received.data} , message : ${received.message}`)
      }
    })
  }

  initData(res: PartiesModelsJson) {
    this.local.setGame(res.game)
    this.local.setMap(res.map)
    this.local.setInfoGame(res.infoGame)
  }

  initSession() {
    this.onInitSession.emit();
  }
}
