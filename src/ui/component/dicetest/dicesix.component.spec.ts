import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicesixComponent } from './dicesix.component';

describe('DicesixComponent', () => {
  let component: DicesixComponent;
  let fixture: ComponentFixture<DicesixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DicesixComponent]
    });
    fixture = TestBed.createComponent(DicesixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
