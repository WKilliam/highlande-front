import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DiceService} from "../../services/dice/dice";

@Component({
  selector: 'app-dicesix',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dice" [ngClass]="{'rolling': diceService.isRolling}" (click)="diceService.rollDice()">
      <div [ngSwitch]="diceService.currentFace" class="face" *ngIf="!diceService.isRolling">
        <ng-container *ngSwitchCase="1">
          <span class="dot center"></span>
        </ng-container>
        <ng-container *ngSwitchCase="2">
          <span class="dot top-left"></span>
          <span class="dot bottom-right"></span>
        </ng-container>
        <ng-container *ngSwitchCase="3">
          <span class="dot top-left"></span>
          <span class="dot center"></span>
          <span class="dot bottom-right"></span>
        </ng-container>
        <ng-container *ngSwitchCase="4">
          <span class="dot top-left"></span>
          <span class="dot top-right"></span>
          <span class="dot bottom-left"></span>
          <span class="dot bottom-right"></span>
        </ng-container>
        <ng-container *ngSwitchCase="5">
          <span class="dot top-left"></span>
          <span class="dot top-right"></span>
          <span class="dot center"></span>
          <span class="dot bottom-left"></span>
          <span class="dot bottom-right"></span>
        </ng-container>
        <ng-container *ngSwitchCase="6">
          <span class="dot top-left"></span>
          <span class="dot top-right"></span>
          <span class="dot mid-left"></span>
          <span class="dot mid-right"></span>
          <span class="dot bottom-left"></span>
          <span class="dot bottom-right"></span>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./dicesix.component.scss']
})
export class DicesixComponent {


  readonly diceService = inject(DiceService);

}
