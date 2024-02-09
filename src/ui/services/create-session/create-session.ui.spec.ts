import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSessionUi } from './create-session.ui';

describe('CreateSessionComponent', () => {
  let component: CreateSessionUi;
  let fixture: ComponentFixture<CreateSessionUi>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateSessionUi]
    });
    fixture = TestBed.createComponent(CreateSessionUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
