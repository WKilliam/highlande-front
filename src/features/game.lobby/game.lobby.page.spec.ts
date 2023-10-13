import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLobbyPage } from './game.lobby.page';

describe('GameLobbyComponent', () => {
  let component: GameLobbyPage;
  let fixture: ComponentFixture<GameLobbyPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameLobbyPage]
    });
    fixture = TestBed.createComponent(GameLobbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
