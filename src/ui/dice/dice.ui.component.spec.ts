import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceUiComponent } from './dice.ui.component';

describe('DiceUiComponent', () => {
  let component: DiceUiComponent;
  let fixture: ComponentFixture<DiceUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DiceUiComponent]
    });
    fixture = TestBed.createComponent(DiceUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
