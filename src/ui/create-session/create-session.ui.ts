import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SessionCreatedBase} from "../../models/room.content.models";
import {CreateSessionUiServices} from "./create-session.ui.services";

@Component({
  selector: 'ui-create-session',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-session.ui.html',
  styleUrls: ['./create-session.ui.scss']
})
export class CreateSessionUi{

  protected readonly createSessionUiServices: CreateSessionUiServices = inject(CreateSessionUiServices);
  protected sessionBody:SessionCreatedBase = {
    name: '',
    password: '',
    mapId: -1,
    teamOneName: '',
    teamTwoName: '',
    teamThreeName: '',
    teamFourName: '',
  }


}
