import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepilotstatusmodalComponent } from './changepilotstatusmodal.component';

describe('ChangepilotstatusmodalComponent', () => {
  let component: ChangepilotstatusmodalComponent;
  let fixture: ComponentFixture<ChangepilotstatusmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangepilotstatusmodalComponent]
    });
    fixture = TestBed.createComponent(ChangepilotstatusmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
