import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Cellule } from './cellule.component'

const routes = [
  {
    path: '',
    component: Cellule,
  },
]

@NgModule({
  declarations: [Cellule],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [Cellule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CelluleModule {}
