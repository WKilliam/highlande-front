import {Component, effect, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSessionUi} from "../../ui/create-session/create-session.ui";
import {AppServices} from "../../app/app.services";
import {LocalstorageServices} from "../../services/localsotrage/localstorage.services";

@Component({
  selector: 'app-game.create.session',
  standalone: true,
  imports: [CommonModule, CreateSessionUi],
  template: `
    <div class="container-fluid">
      <div class="row" style="padding: 2rem">
        <div class="col-3">
        </div>
        <div class="col-6">
          <ui-create-session></ui-create-session>
        </div>
        <div class="col-3">
        </div>
      </div>
    </div>`,
  styleUrls: ['./game.create.session.page.scss']
})
export class GameCreateSessionPage {

}
