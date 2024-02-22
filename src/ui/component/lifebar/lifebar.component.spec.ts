import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifebarComponent } from './lifebar.component';

describe('LifebarComponent', () => {
  let component: LifebarComponent;
  let fixture: ComponentFixture<LifebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LifebarComponent]
    });
    fixture = TestBed.createComponent(LifebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
