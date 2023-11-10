import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardsFightUi} from "../cards-fight/cards-fight.ui";
import {LittleCardSelectorUi} from "../little-card-selector/little-card-selector.ui";

@Component({
  selector: 'ui-swiper-card',
  standalone: true,
  imports: [CommonModule, CardsFightUi, LittleCardSelectorUi],
  template: `
    <div class="content-carousel">
<!--      <div class="container">-->
<!--        <div class="cards-container" *ngFor="let item of items">-->
<!--          <ui-little-card-selector-->
<!--            [imageSrc]="item.image"-->
<!--            [raritySrc]="item.rarity"-->
<!--            (click)="selectedCard(item.id)"-->
<!--          ></ui-little-card-selector>-->
<!--        </div>-->
<!--      </div>-->
    </div>

  `,
  styleUrls: ['./swiper-card.ui.scss']
})
export class SwiperCardUi
  // implements OnInit
{


  // items: Array<CardsModel> = []
  // @Input() userId: number = -1;
  // @Input() teamTagByCard: string = ''
  // @Input() positionByCard: number = -1
  // @Input() room: string = ''
  // @Input() avatar: string = ''
  // @Input() pseudo: string = ''
  //
  // private isDown = false;
  // private startX: number | undefined;
  // private scrollLeft: number | undefined;
  // private readonly storeApi = inject(StoreServicesApi)
  // private readonly el = inject(ElementRef)
  // private storeSocket = inject(StoreServicesSocket)
  //
  // ngOnInit(): void {
  //   if (this.userId !== -1) {
  //     this.storeApi.getAllCardsPossessedByIDUser(this.userId).subscribe((data) => {
  //       if (data.code >= 200 && data.code < 300) {
  //         console.log(data.data)
  //         this.items = data.data
  //       }
  //     })
  //   }
  // }
  //
  // @HostListener('wheel', ['$event'])
  // onWheel(event: WheelEvent) {
  //   const container = this.el.nativeElement.querySelector('.container');
  //   container.scrollLeft += event.deltaY;
  //   event.preventDefault();
  // }
  //
  // @HostListener('mousedown', ['$event'])
  // onMouseDown(event: MouseEvent): void {
  //   this.isDown = true;
  //   this.startX = event.pageX - (this.el.nativeElement as HTMLElement).offsetLeft;
  //   this.scrollLeft = (this.el.nativeElement as HTMLElement).scrollLeft;
  // }
  //
  // @HostListener('mouseleave')
  // onMouseLeave(): void {
  //   this.isDown = false;
  // }
  //
  // @HostListener('mouseup')
  // onMouseUp(): void {
  //   this.isDown = false;
  // }
  //
  // @HostListener('mousemove', ['$event'])
  // onMouseMove(event: MouseEvent): void {
  //   if (!this.isDown) return;
  //   event.preventDefault();
  //   const x = event.pageX - (this.el.nativeElement as HTMLElement).offsetLeft;
  //   const walk = (x - (this.startX || 0)) * 2;
  //   (this.el.nativeElement as HTMLElement).scrollLeft = (this.scrollLeft || 0) - walk;
  //
  //   const container = this.el.nativeElement.querySelector('.container');
  //   const isEndReached = container.scrollLeft + container.offsetWidth >= container.scrollWidth;
  //   if (isEndReached) {
  //     container.classList.add('adjusted');
  //   } else {
  //     container.classList.remove('adjusted');
  //   }
  // }
  //
  // selectedCard(id: number) {
  //   if (this.teamTagByCard === '' && this.positionByCard === -1 && this.room === '' && this.avatar === '' && this.pseudo === '') {
  //     let socketJoinTeamCard: SocketJoinTeamCard = {
  //       room: this.room,
  //       avatar: this.avatar,
  //       pseudo: this.pseudo,
  //       teamTag: this.teamTagByCard,
  //       position: this.positionByCard,
  //       cardsId: id
  //     }
  //     this.storeSocket.selectCardTeam(socketJoinTeamCard)
  //   } else {
  //     console.log('error')
  //   }
  //
  // }
}
