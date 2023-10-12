import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUiComponent } from './map.ui.component';

describe('MapUiComponent', () => {
  let component: MapUiComponent;
  let fixture: ComponentFixture<MapUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MapUiComponent]
    });
    fixture = TestBed.createComponent(MapUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
