import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCardUi } from '../../component/team-card/team-card.ui';

describe('TeamCardComponent', () => {
  let component: TeamCardUi;
  let fixture: ComponentFixture<TeamCardUi>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeamCardUi]
    });
    fixture = TestBed.createComponent(TeamCardUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
