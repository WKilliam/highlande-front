import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Teams} from "../../models/teams";
import {DATATEAM} from "../../models/@default.data";

@Component({
  selector: 'ui-team-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card  bg-transparent card-effect" style="margin: 1rem">
      <div class="card-header text-center team-text">
        {{teamContent?.teamName}}
      </div>
      <div class="card-body text-center">
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle">
                  <img
                    [src]="teamContent?.player1?.card?.image"
                    alt="Image"
                    [ngClass]="teamContent?.player1?.card?.rarity"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <button type="button" class="join-btn">Join</button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="rectangle" #rectangle>
                  <img
                    [src]="teamContent?.player2?.card?.image"
                    alt="Image"
                    [ngClass]="teamContent?.player2?.card?.rarity"
                    width="120"
                    height="224"
                  />
                </div>
              </div>
              <div class="col">
                <button type="button" class="join-btn">Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Atk :</div>
            <div class="circle">{{teamContent?.teamAtk}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Def :</div>
            <div class="circle">{{teamContent?.teamDef}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Spd :</div>
            <div class="circle">{{teamContent?.teamSpd}}</div>
          </div>
          <div class="d-flex align-items-center">
            <div class="text-after-circle">Luk :</div>
            <div class="circle">{{teamContent?.teamLuk}}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./team-card.ui.scss']
})
export class TeamCardUi {
  @Input() teamContent : Teams = DATATEAM
}
