import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div class="header-content">
      </div>
    </div>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
