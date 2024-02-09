import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreateSessionPage } from './game.create.session.page';

describe('GameCreateSessionComponent', () => {
  let component: GameCreateSessionPage;
  let fixture: ComponentFixture<GameCreateSessionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameCreateSessionPage]
    });
    fixture = TestBed.createComponent(GameCreateSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
