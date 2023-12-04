import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TesteurIoService} from "./testeur-io.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersLogin} from "../../models/users.models";
import {TextConstante} from "../../app/text.constante";

@Component({
  selector: 'app-testeur-io',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div style="padding: 3rem">
      <div>
        <form #form="ngForm" (ngSubmit)="testeurioService.login(loginUser)">
          <fieldset class="form-group">
            <input
              [(ngModel)]="loginUser.email"
              class="form-control form-control-lg"
              type="text"
              placeholder="Email"
              name="email"
              required
              email
            />
          </fieldset>
          <fieldset class="form-group">
            <input
              [(ngModel)]="loginUser.password"
              class="form-control form-control-lg"
              type="password"
              placeholder="Password"
              name="password"
              password
            />
          </fieldset>
          <button
            type="submit"
            class="btn btn-lg btn-primary pull-xs-right"
          >
            {{textMap.textUi.get('login')}}
          </button>
        </form>
      </div>
      <div style="color: #FFFFFF;font-size: 0.9rem;padding: 2rem">
        {{ testeurioService.getUser() | json }}
      </div>
      <div>
        <button
          class="btn btn-lg btn-primary pull-xs-right"
          (click)="testeurioService.moveCreateSession()">
          {{textMap.textUi.get('goToSession')}}</button>
      </div>
    </div>
  `,
  styleUrls: ['./testeur-io.component.scss']
})
export class TesteurIOComponent {

  protected readonly testeurioService: TesteurIoService = inject(TesteurIoService);
  protected loginUser: UsersLogin = {email: '', password: ''};
  protected textMap: TextConstante = inject(TextConstante)


}
