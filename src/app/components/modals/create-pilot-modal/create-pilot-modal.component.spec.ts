import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePilotModalComponent } from './create-pilot-modal.component';

describe('CreatePilotModalComponent', () => {
  let component: CreatePilotModalComponent;
  let fixture: ComponentFixture<CreatePilotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePilotModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePilotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
