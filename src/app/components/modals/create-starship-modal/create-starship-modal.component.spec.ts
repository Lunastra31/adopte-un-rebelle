import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStarshipModalComponent } from './create-starship-modal.component';

describe('CreateStarshipModalComponent', () => {
  let component: CreateStarshipModalComponent;
  let fixture: ComponentFixture<CreateStarshipModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStarshipModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStarshipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
