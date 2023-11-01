import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMissionModalComponent } from './create-mission-modal.component';

describe('CreateMissionModalComponent', () => {
  let component: CreateMissionModalComponent;
  let fixture: ComponentFixture<CreateMissionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMissionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
