import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsFightUi } from './cards-fight.ui';

describe('CardsFightComponent', () => {
  let component: CardsFightUi;
  let fixture: ComponentFixture<CardsFightUi>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardsFightUi]
    });
    fixture = TestBed.createComponent(CardsFightUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
