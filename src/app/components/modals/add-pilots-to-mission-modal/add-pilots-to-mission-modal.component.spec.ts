import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPilotsToMissionModalComponent } from './add-pilots-to-mission-modal.component';

describe('AddPilotsToMissionModalComponent', () => {
  let component: AddPilotsToMissionModalComponent;
  let fixture: ComponentFixture<AddPilotsToMissionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPilotsToMissionModalComponent]
    });
    fixture = TestBed.createComponent(AddPilotsToMissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
