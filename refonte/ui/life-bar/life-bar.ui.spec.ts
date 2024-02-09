import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeBarUi } from './life-bar.ui';

describe('LifeBarComponent', () => {
  let component: LifeBarUi;
  let fixture: ComponentFixture<LifeBarUi>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LifeBarUi]
    });
    fixture = TestBed.createComponent(LifeBarUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
