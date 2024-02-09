import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyRoomUi } from '../../component/lobby-room/lobby-room.ui';

describe('LobbyRoomComponent', () => {
  let component: LobbyRoomUi;
  let fixture: ComponentFixture<LobbyRoomUi>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LobbyRoomUi]
    });
    fixture = TestBed.createComponent(LobbyRoomUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
