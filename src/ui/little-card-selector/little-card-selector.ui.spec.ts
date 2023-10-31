import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleCardSelectorUi } from './little-card-selector.ui';

describe('LittleCardSelectorComponent', () => {
  let component: LittleCardSelectorUi;
  let fixture: ComponentFixture<LittleCardSelectorUi>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LittleCardSelectorUi]
    });
    fixture = TestBed.createComponent(LittleCardSelectorUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
