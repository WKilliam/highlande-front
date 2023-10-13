import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreServices} from "../../services/store/store.services";
import {MapsModels} from "../../models/maps.models";

@Component({
  selector: 'ui-create-session',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-session.ui.html',
  styleUrls: ['./create-session.ui.scss']
})
export class CreateSessionUi implements OnInit {

  showPasswordField: boolean = false;
  readonly store = inject(StoreServices)

  togglePasswordField(event: any) {
    const selectedOption = event.target.value;
    this.showPasswordField = selectedOption === 'private';
  }

  maps: Array<MapsModels> = [
    // {
    //   "backgroundImg": "https://i.pinimg.com/originals/fd/c1/53/fdc15338eee7d61d57af6f12f3c47fec.png",
    //   "width": 936,
    //   "height": 620,
    //   "name": "Carte 1",
    // },
    // {
    //   "backgroundImg": "URL_de_la_carte_2",
    //   "width": 1000,
    //   "height": 800,
    //   "name": "Carte 2",
    // },
    // // Ajoutez d'autres objets de carte ici
  ];

  ngOnInit(): void {
    this.pullMaps()
  }

  pullMaps() {
    this.store.getAllMaps().subscribe((maps: Array<MapsModels>) => {
      this.maps = maps;
    })
  }

}
