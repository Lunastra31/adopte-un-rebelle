import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndMissionModalComponent } from './end-mission-modal.component';

describe('EndMissionModalComponent', () => {
  let component: EndMissionModalComponent;
  let fixture: ComponentFixture<EndMissionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndMissionModalComponent]
    });
    fixture = TestBed.createComponent(EndMissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
