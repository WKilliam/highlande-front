import {Component} from '@angular/core'
import {Title} from '@angular/platform-browser'

@Component({
  selector: 'not-found',
  standalone: true,
  template: `
    <div class="not-found-container">
      <h3>OOPS! PAGE NOT FOUND</h3>
      <div class="not-found-container1"><h1 class="not-found-text1">404</h1></div>
      <div class="not-found-container2">
        <h2 class="not-found-text2">
          WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
        </h2>
      </div>
    </div>
  `,
  styleUrls: ['not.found.component.scss'],
})
export class NotFound {
  constructor(private title: Title) {
    this.title.setTitle('404 - Not Found')
  }
}
