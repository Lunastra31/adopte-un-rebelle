import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectPilotToStarshipModalComponent } from './affect-pilot-to-starship-modal.component';

describe('AffectPilotToStarshipModalComponent', () => {
  let component: AffectPilotToStarshipModalComponent;
  let fixture: ComponentFixture<AffectPilotToStarshipModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectPilotToStarshipModalComponent]
    });
    fixture = TestBed.createComponent(AffectPilotToStarshipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
