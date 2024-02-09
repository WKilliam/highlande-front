import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateSessionUiServices} from "../../services/create-session/create-session.ui.services";

@Component({
  selector: 'ui-create-session',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header" align="center">
        <p>{{ createSessionUiServices.getEventTextContentForm().sessionCreatingTitle }}</p>
      </div>
      <div class="card-body">
        <form #form="ngForm" (ngSubmit)="createSessionUiServices.createSession(createSessionUiServices.getEventTextContentFormContent())">
          <div class="row">
            <div class="col">
              <fieldset class="form-group">
                <label>{{ createSessionUiServices.getEventTextContentForm().sessionNameLabel }}</label>
                <input
                  [(ngModel)]="createSessionUiServices.getEventTextContentFormContent().name"
                  class="form-control form-control-lg"
                  type="text"
                  [placeholder]="createSessionUiServices.getEventTextContentForm().sessionNamePlaceholder"
                  name="sessionName"
                  required
                >
              </fieldset>
            </div>
          </div>
          <div class="row" style="margin-top: 1rem">
            <div class="col-md">
              <fieldset class="form-group">
                <label>{{ createSessionUiServices.getEventTextContentForm().sessionTeamLabel }}</label>
                <input
                  [(ngModel)]="createSessionUiServices.getEventTextContentFormContent().teamOneName"
                  class="form-control form-control-lg"
                  type="text"
                  [placeholder]="createSessionUiServices.getEventTextContentForm().sessionTeamPlaceholder"
                  name="TeamNameOne"
                  required
                >
              </fieldset>
            </div>
            <div class="col-md">
              <fieldset class="form-group">
                <label>{{ createSessionUiServices.getEventTextContentForm().sessionTeamLabel }}</label>
                <input
                  [(ngModel)]="createSessionUiServices.getEventTextContentFormContent().teamTwoName"
                  class="form-control form-control-lg"
                  type="text"
                  [placeholder]="createSessionUiServices.getEventTextContentForm().sessionTeamPlaceholder"
                  name="TeamNametwo"
                  required
                >
              </fieldset>
            </div>
          </div>
          <div class="row" style="margin-top: 1rem">
            <div class="col-md">
              <fieldset class="form-group">
                <label>{{ createSessionUiServices.getEventTextContentForm().sessionTeamLabel }}</label>
                <input
                  [(ngModel)]="createSessionUiServices.getEventTextContentFormContent().teamThreeName"
                  class="form-control form-control-lg"
                  type="text"
                  [placeholder]="createSessionUiServices.getEventTextContentForm().sessionTeamPlaceholder"
                  name="TeamNameThree"
                  required
                >
              </fieldset>
            </div>
            <div class="col-md">
              <fieldset class="form-group">
                <label>{{ createSessionUiServices.getEventTextContentForm().sessionTeamLabel }}</label>
                <input
                  [(ngModel)]="createSessionUiServices.getEventTextContentFormContent().teamFourName"
                  class="form-control form-control-lg"
                  type="text"
                  [placeholder]="createSessionUiServices.getEventTextContentForm().sessionTeamPlaceholder"
                  name="TeamNameFour"
                  required
                >
              </fieldset>
            </div>
          </div>
          <div class="row" style="margin-top: 1rem">
            <fieldset class="form-group">
              <label>{{ createSessionUiServices.getEventTextContentForm().sessionPrivateLabel }}</label>
              <input
                [(ngModel)]="createSessionUiServices.getEventTextContentFormContent().password"
                class="form-control form-control-lg"
                type="text"
                [placeholder]="createSessionUiServices.getEventTextContentForm().sessionPrivatePlaceholder"
                name="sessionPassword"
                required
              >

            </fieldset>
          </div>
          <div class="row" style="margin-top: 1rem">
            <div class="col">
              <fieldset class="form-group">
                <label>{{ createSessionUiServices.getEventTextContentForm().sessionMapLabel }}</label>
                <div class="form-floating">
                  <select
                    class="form-control form-control-lg"
                    [(ngModel)]="createSessionUiServices.getEventTextContentFormContent().mapId"
                    name="selSessionOptionMap"
                  >
                    <option *ngFor="let map of createSessionUiServices.getMaps()" [value]="map.id">
                      {{ map.name }}
                    </option>
                  </select>
                  <label>{{ createSessionUiServices.getEventTextContentForm().sessionMapPlaceholder }}</label>
                </div>
              </fieldset>
            </div>
          </div>
        </form>
        <div class="row" style="margin-top: 1rem">
          <div class="col-lg-auto">
            <fieldset class="form-group">
              <button
                class="btn btn-lg btn-success pull-ls-right"
                (click)="createSessionUiServices.createSession(createSessionUiServices.getEventTextContentFormContent())"
              >
                {{ createSessionUiServices.getEventTextContentForm().sessionBtnLabel }}
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./create-session.ui.scss']
})
export class CreateSessionUi {

  protected readonly createSessionUiServices: CreateSessionUiServices = inject(CreateSessionUiServices);

}
