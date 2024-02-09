import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSessionPage } from './game-session-page.component';

describe('GameSessionComponent', () => {
  let component: GameSessionPage;
  let fixture: ComponentFixture<GameSessionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameSessionPage]
    });
    fixture = TestBed.createComponent(GameSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
