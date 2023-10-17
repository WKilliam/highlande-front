import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteurIOComponent } from './testeur-io.component';

describe('TesteurIOComponent', () => {
  let component: TesteurIOComponent;
  let fixture: ComponentFixture<TesteurIOComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TesteurIOComponent]
    });
    fixture = TestBed.createComponent(TesteurIOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
