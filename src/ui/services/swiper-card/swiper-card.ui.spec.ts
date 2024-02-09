import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperCardUi } from '../../component/swiper-card/swiper-card.ui';

describe('SwiperCardComponent', () => {
  let component: SwiperCardUi;
  let fixture: ComponentFixture<SwiperCardUi>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SwiperCardUi]
    });
    fixture = TestBed.createComponent(SwiperCardUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
